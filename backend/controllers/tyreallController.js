const Tyre = require("../models/Tyreall");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");

// Multer setup
const storage = multer.memoryStorage();
const uploads = multer({ storage });

const uploadBoth = uploads.fields([
  { name: "image", maxCount: 1 },
  { name: "brandLogo", maxCount: 1 }
]);

const uploadSingle = uploads.single("image");

const priceAdditions = {
  Premium: { 1: 210, 2: 160, 3: 140, 4: 110, 5: 120 },
  "Mid-Range": { 1: 200, 2: 150, 3: 130, 4: 100, 5: 110 },
  Budget: { 1: 190, 2: 140, 3: 115, 4: 85, 5: 90 },
};

// Add a new tyre
const addTyre = async (req, res) => {
  try {
    let {
      Brand, SIZE, Model, Type,
      "LOAD/SPEED RATING": rating,
      Marking, RunFlat,
      "Price Incl GST": price,
      "In Stock": inStock,
      "UNLOADING IN 24 HRS": unloading,
      category,
    } = req.body;

    if (!Brand || !SIZE || !Model || !price || !inStock || !category) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    // Normalize SIZE
    const parsed = parseSize(SIZE);
    if (parsed.width && parsed.rim) {
      if (parsed.profile) {
        SIZE = `${parsed.prefix}${parsed.width}/${parsed.profile}R${parsed.rim}${parsed.suffix}`;
      } else {
        SIZE = `${parsed.prefix}${parsed.width}R${parsed.rim}${parsed.suffix}`;
      }
    }

    const additions = priceAdditions[category];
    if (!additions) {
      return res.status(400).json({ error: "Invalid category provided" });
    }

    const basePrice = parseFloat(price);
    if (isNaN(basePrice)) {
      return res.status(400).json({ error: "Invalid price value" });
    }

    const price1 = Math.round(basePrice + additions[1]);
    const price2 = Math.round(basePrice + additions[2]);
    const price3 = Math.round(basePrice + additions[3]);
    const price4 = Math.round(basePrice + additions[4]);
    const price5 = Math.round(basePrice + additions[5]);

    let imageUrl = "";
    if (req.files?.image) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "tyres" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(req.files.image[0].buffer);
      });
      imageUrl = result.secure_url;
    }

    let brandLogoUrl = "";
    if (req.files?.brandLogo) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "tyres/brand_logos" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(req.files.brandLogo[0].buffer);
      });
      brandLogoUrl = result.secure_url;
    }

    const tyre = new Tyre({
      Brand,
      SIZE,
      "LOAD/SPEED RATING": rating,
      Model,
      Type,
      Marking,
      RunFlat,
      "Price for 1": price1,
      "Price for 2": price2,
      "Price for 3": price3,
      "Price for 4": price4,
      "Price for 5": price5,
      "Price Incl GST": basePrice,
      "In Stock": inStock,
      "UNLOADING IN 24 HRS": unloading,
      image_url: imageUrl,
      brand_logo_url: brandLogoUrl,
      category
    });

    await tyre.save();
    res.status(201).json({ message: "Tyre added successfully", data: tyre });
  } catch (err) {
    res.status(500).json({ error: "Failed to add tyre", details: err.message });
  }
};

const deleteTyre = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tyre.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Tyre not found" });
    }
    res.json({ message: "Tyre deleted successfully", data: deleted });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tyre", details: error.message });
  }
};

const getAllTyres = async (req, res) => {
  try {
    const tyres = await Tyre.find();
    res.json(tyres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTyresBySize = async (req, res) => {
  try {
    const { width, profile, rim } = req.body;

    if (!width || !rim) {
      return res.status(400).json({ error: "Missing width or rim" });
    }

    let pattern;

    // If `profile` is provided, match all fields (width, profile, rim)
    if (profile) {
      pattern = new RegExp(`^${width}/${profile}R${rim}`, 'i');
    } else {
      // If `profile` is not provided, match tyres with no profile
      pattern = new RegExp(`^${width}R${rim}`, 'i');
    }

    const tyres = await Tyre.aggregate([
      { $match: { SIZE: pattern } },
      {
        $addFields: {
          brandPriority: { $cond: [{ $eq: ["$Brand", "ZETA"] }, 0, 1] }
        }
      },
      { $sort: { brandPriority: 1 } }
    ]);

    res.json(tyres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTyresByBrand = async (req, res) => {
  try {
    const brand = req.params.brand;
    const tyres = await Tyre.find({
      Brand: { $regex: new RegExp(`^${brand}$`, "i") }
    });
    res.status(200).json({ success: true, data: tyres });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateInStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { inStock } = req.body;
    const updated = await Tyre.findByIdAndUpdate(id, { "In Stock": String(inStock) }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTyreImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) return res.status(400).json({ error: "No image file provided" });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "tyres" },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    const tyre = await Tyre.findById(id);
    if (!tyre) return res.status(404).json({ error: "Tyre not found" });

    const updated = await Tyre.updateMany(
      { Brand: tyre.Brand, Model: tyre.Model },
      { $set: { image_url: result.secure_url } }
    );

    res.json({
      message: "Image updated successfully for all matching tyres",
      updatedCount: updated.modifiedCount,
      newImage: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update image", details: error.message });
  }
};

const updateTyrePrices = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = {};
    const allowedPriceFields = [
      "Price for 1",
      "Price for 2",
      "Price for 3",
      "Price for 4",
      "Price for 5"
    ];
    allowedPriceFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    const updated = await Tyre.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updated) return res.status(404).json({ error: "Tyre not found" });

    res.json({ message: "Prices updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ error: "Failed to update prices", details: error.message });
  }
};

const getTyreBySlug = async (req, res) => {
  try {
    const tyre = await Tyre.findOne({ slug: req.params.slug });
    if (!tyre) return res.status(404).json({ message: "Tyre not found" });
    res.json(tyre);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Updated parseSize Function (supports all common formats)
function parseSize(sizeStr) {
  sizeStr = sizeStr.toUpperCase().replace(/\s+/g, "");
  const regex = /^(LT|HL|P)?(\d{3})(?:[X/](\d{1,3}))?(?:[ZR]?)(\d{2})([A-Z]{1,3})?$/;
  const match = sizeStr.match(regex);
  if (!match) return {};
  return {
    prefix: match[1] || "",
    width: Number(match[2]),
    profile: match[3] ? Number(match[3]) : null,
    rim: Number(match[4]),
    suffix: match[5] || ""
  };
}

const searchTyres = async (req, res) => {
  try {
    const {
      width,
      profile,
      rim,
      runflat,
      brand,
      model,
      type,
      speed_rating,
      load_index,
      page = 1,
      limit = 50,
    } = req.query;

    let query = {};

    // Handle SIZE filtering
    if (width || profile || rim) {
      let sizeRegex = "^"; // Start building the regex pattern

      if (width) {
        sizeRegex += `${width}`; // Add width to the regex
      }

      if (profile === "no-profile") {
        // If `no-profile` is selected, match tyres with no profile
        sizeRegex += `R${rim || "\\d+"}$`; // Match `widthRrim`
      } else if (profile) {
        // If a specific profile is provided, match `width/profileRrim`
        sizeRegex += `/${profile}R${rim || "\\d+"}$`;
      } else if (rim) {
        // If only `rim` is provided, match `width.*Rrim`
        sizeRegex += `.*R${rim}$`;
      } else {
        // If only `width` is provided, match all sizes starting with `width`
        sizeRegex += ".*";
      }

      query.SIZE = { $regex: new RegExp(sizeRegex, "i") };
    }

    // Handle RunFlat filtering
    if (runflat) {
      if (runflat === "Yes") {
        query.RunFlat = "YES";
      } else if (runflat === "No") {
        query.$or = [
          { RunFlat: "NO" },
          { RunFlat: null },
          { RunFlat: "" },
          { RunFlat: { $exists: false } },
          { RunFlat: { $type: "double" } },
        ];
      }
    }

    // Handle Brand filtering
    if (brand) query.Brand = brand;

    // Handle Model filtering
    if (model) query.Model = { $regex: model, $options: "i" };

    // Handle Type filtering
    if (type) query.Type = { $in: Array.isArray(type) ? type : [type] };

    // Handle LOAD/SPEED RATING filtering
    if (load_index && speed_rating) {
      query["LOAD/SPEED RATING"] = {
        $regex: `^${load_index}${speed_rating}$`,
        $options: "i",
      };
    } else if (speed_rating) {
      query["LOAD/SPEED RATING"] = { $regex: `${speed_rating}$`, $options: "i" };
    } else if (load_index) {
      query["LOAD/SPEED RATING"] = { $regex: `^${load_index}`, $options: "i" };
    }

    // Pagination
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Fetch tyres with aggregation pipeline
    const tyres = await Tyre.aggregate([
      { $match: query },
      {
        $addFields: {
          brandPriority: { $cond: [{ $eq: ["$Brand", "ZETA"] }, 0, 1] },
        },
      },
      { $sort: { brandPriority: 1 } },
      { $skip: (pageNumber - 1) * limitNumber },
      { $limit: limitNumber },
    ]);

    // Count total tyres matching the query
    const total = await Tyre.countDocuments(query);

    res.json({
      tyres,
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllTyres,
  getTyresBySize,
  updateInStock,
  addTyre,
  deleteTyre,
  updateTyreImage,
  uploadBoth,
  uploadSingle,
  updateTyrePrices,
  getTyreBySlug,
  getTyresByBrand,
  searchTyres
};
