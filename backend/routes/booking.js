const express = require("express");
const nodemailer = require("nodemailer");
const BookingSlot = require("../models/BookingSlot");
const Booking = require("../models/Booking");
const Tyreall = require("../models/Tyreall");

const router = express.Router();

// ✅ Setup transporter (example: Gmail, better use custom domain SMTP in production)
const transporter1 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your email 1
    pass: process.env.EMAIL_PASS, // app password 1
  },
});

const transporter2 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER2, // your email 2
    pass: process.env.EMAIL_PASS2, // app password 2
  },
});

// Helper function to generate order ID
function generateOrderId() {
  const timestamp = Date.now().toString(36); // base36 -> shorter unique part
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `AUSSIEMOBILE-${randomStr}`;
}

// Helper function to calculate finalAmount after applying the coupon
const calculateFinalAmount = (total, couponCode) => {
  // Example: Apply a 10% discount for demonstration if a coupon is provided
  if (couponCode) {
    const discountPercentage = 0.10; // 10% discount for example
    return total - total * discountPercentage;
  }
  return total; // If no coupon is applied, return total as finalAmount
};

// Confirm booking endpoint
router.post("/confirm", async (req, res) => {
  const booking = req.body; // this is your bookingPayload from frontend
  const {
    cart,
    form,
    formNew,
    formData,
    selectedTyres,
    selectedDate,
    selectedTime,
    total,
    finalAmount,
    appliedCoupon,
  } = booking;

  const orderId = generateOrderId();

  // Calculate finalAmount
  const calculatedFinalAmount = calculateFinalAmount(total, appliedCoupon);

  try {
    // -----------------------
    // 1. Email to Shopkeeper (send from two different emails)
    // -----------------------
    const shopkeeperMailContent = `
      <h2>New Booking Received</h2>
      <p><b>Name:</b> ${form.firstName} ${form.lastName}</p>
      <p><b>Email:</b> ${form.email}</p>
      <p><b>Phone:</b> ${form.phone}</p>
      <p><b>Address:</b> ${formNew.address}</p>
      <p><b>Suburb:</b> ${formNew.suburb}</p>
      <p><b>Postcode:</b> ${formNew.postcode}</p>
      <p><b>Date:</b> ${selectedDate}</p>
      <p><b>Time:</b> ${selectedTime}</p>
      <p><b>Vehicle No:</b> ${formData.vehicleDetails}</p>
      <p><b>State:</b> ${formData.state}</p>
      <p><b>Colour:</b> ${formData.colour}</p>
      <p><b>Make:</b> ${formData.make}</p>
      <p><b>Model:</b> ${formData.model}</p>
      <p><b>Coupon Applied:</b> ${appliedCoupon || "None"}</p>
      <p><b>Total:</b> $${total}</p>
      <p><b>Final Amount:</b> $${calculatedFinalAmount || total}</p>
      <h3>Items:</h3>
      <ul>
        ${cart
          .map(
            (item) =>
              `<li>${item.brand}-${item.model} - RunFlat:${item.RunFlat} - Type :${item.Type} - Marking :${item.Marking} (${item.width} /${item.profile}R${item.rimSize})${item.rating} - Tyre: ${item.quantity} - $${item.price * item.quantity}</li>`
          )
          .join("")}
      </ul>
      <h3>Selected Tyres To be Replaced:</h3>
      <ul>
        ${selectedTyres ? selectedTyres.map((tyre) => `<li>${tyre}</li>`).join("") : "None"}
      </ul>
    `;

    const shopkeeperMail1 = {
      from: process.env.EMAIL_USER,
      to: process.env.SHOPKEEPER_EMAIL,
      subject: `🛒 New Order from ${form.firstName}`,
      html: shopkeeperMailContent,
    };

    const shopkeeperMail2 = {
      from: process.env.EMAIL_USER2,
      to: process.env.SHOPKEEPER_EMAIL2,
      subject: `🛒 New Order from ${form.firstName}`,
      html: shopkeeperMailContent,
    };

    await transporter1.sendMail(shopkeeperMail1);
    await transporter2.sendMail(shopkeeperMail2);

    // -----------------------
    // 2. Confirmation to User
    // -----------------------
    const userMail = {
      from: process.env.EMAIL_USER,
      to: form.email,
      subject: "✅ Order Confirmation - Thank you!",
      html: `
        <h2>Hi ${form.firstName},</h2>
        <p>Thank you for your booking. Here are your order details:</p>
        <p><b>Your Order ID:</b> ${orderId}</p>
        <p><b>Date:</b> ${selectedDate}</p>
        <p><b>Time:</b> ${selectedTime}</p>
        <p><b>Address:</b> ${formNew.address}</p>
        <p><b>Suburb:</b> ${formNew.suburb}</p>
        <p><b>Postcode:</b> ${formNew.postcode}</p>
        <p><b>Vehicle No:</b> ${formData.vehicleDetails}</p>
        <p><b>State:</b> ${formData.state}</p>
        <p><b>Colour:</b> ${formData.colour}</p>
        <p><b>Make:</b> ${formData.make}</p>
        <p><b>Model:</b> ${formData.model}</p>
        <h3>Selected Tyres To be Replaced:</h3>
        <ul>
          ${selectedTyres ? selectedTyres.map((tyre) => `<li>${tyre}</li>`).join("") : "None"}
        </ul>
        <h3>Items:</h3>
        <ul>
          ${cart
            .map(
              (item) =>
                `<li>${item.brand} ${item.model} - RunFlat:${item.RunFlat} - Type :${item.Type} - Marking :${item.Marking} (${item.width}/${item.profile}R${item.rimSize})${item.rating} - Tyre: ${item.quantity} - $${item.price * item.quantity}</li>`
            )
            .join("")}
        </ul>
        <p><b>Total:</b> $${total}</p>
        <p><b>Final Paid Amount:</b> $${calculatedFinalAmount || total}</p>
        <br/>
        <p>We will contact you soon!</p>
      `,
    };

    await transporter1.sendMail(userMail);

    // --------------------------------------------------------------------------------------------
    // 3. Create Booking Slot
    // -----------------------------------------------------------------------------------------------
    if (!selectedDate || !selectedTime) {
      return res.status(400).json({ success: false, message: "Date and phase are required" });
    }
    const phases = ["morning", "lunch", "afternoon"];

    // === FLEXIBLE BOOKING HANDLING ===
    if (selectedTime === "flexible") {
      // Randomize phases order
      const shuffledPhases = phases.sort(() => 0.5 - Math.random());
      let bookedPhase = null;

      for (const phase of shuffledPhases) {
        let slot = await BookingSlot.findOne({ date: selectedDate, phase });

        if (!slot) {
          // Create new slot if not exist
          slot = new BookingSlot({
            date: selectedDate,
            phase,
            availableSlots: 2, // default 3 - 1 (because booking this now)
          });
          await slot.save();
          bookedPhase = phase;
          break;
        }

        if (slot.availableSlots > 0) {
          slot.availableSlots -= 1;
          await slot.save();
          bookedPhase = phase;
          break;
        }

        // else: this phase exists but is full, continue loop
      }

      if (!bookedPhase) {
        return res.status(400).json({ success: false, message: "All slots are fully booked for this date" });
      }

    } else {
      // === NORMAL BOOKING HANDLING ===
      let defaultAvailable = 0;
      if (["morning", "lunch", "afternoon"].includes(selectedTime)) {
        defaultAvailable = 3;
      } else {
        return res.status(400).json({ success: false, message: "Invalid phase" });
      }

      let slot = await BookingSlot.findOne({ date: selectedDate, phase: selectedTime });

      if (!slot) {
        slot = new BookingSlot({
          date: selectedDate,
          phase: selectedTime,
          availableSlots: defaultAvailable - 1, // create with 2 left
        });
        await slot.save();
      } else if (slot.availableSlots > 0) {
        slot.availableSlots -= 1;
        await slot.save();
      } else {
        return res.status(400).json({ success: false, message: "Slot is fully booked" });
      }
    }

    // Save booking in DB with calculated finalAmount
    const newBooking = new Booking({
      orderId,
      customer: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
      },
      address: {
        address: formNew.address,
        suburb: formNew.suburb,
        postcode: formNew.postcode,
      },
      vehicle: {
        vehicleDetails: formData.vehicleDetails,
        state: formData.state,
        colour: formData.colour,
        make: formData.make,
        model: formData.model,
      },
      cart,
      selectedTyres,
      selectedDate,
      selectedTime,
      appliedCoupon,
      total,
      finalAmount: calculatedFinalAmount,
      status: "pending", // default
    });

    await newBooking.save();

    // ------------------------
    // Stock Update Logic
    // ------------------------
    for (const item of cart) {
      const orderedQty = Number(item.quantity);

      const query = {
        Brand: item.brand,
        Model: item.model,
        SIZE: `${item.width}/${item.profile}R${item.rimSize}`,
      };

      // Helper: only add if value is not null/undefined/NaN/empty
      const addIfValid = (key, value) => {
        if (value !== null && value !== undefined && value !== "" && value !== "NaN" && !Number.isNaN(value)) {
          query[key] = value;
        }
      };

      addIfValid("Type", item.Type);
      addIfValid("RunFlat", item.RunFlat);
      addIfValid("LOAD/SPEED RATING", item.rating);
      addIfValid("Marking", item.Marking);

      const tyre = await Tyreall.findOne(query);

      if (tyre) {
        const currentStock = parseInt(tyre["In Stock"], 10) || 0;
        const newStock = currentStock - orderedQty;

        // Save back as string (your schema uses String type)
        tyre["In Stock"] = String(newStock >= 0 ? newStock : 0);

        await tyre.save();
      }
    }

    // Return success response
    return res.status(200).json({ success: true, message: "Booking confirmed", orderId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
