import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAdminStore } from '../store/adminStore';
import { useShopStore } from '../store/shopStore'
import { FaTrash } from "react-icons/fa";

import { useConfirm } from '../components/ConfirmDialog';
import axios from '../utils/axiosInstance';

import filterOptions from "../data/tyre_unique_values.json";
import RichTextEditor from '../components/RichTextEditor';


export default function AdminDashboard() {

  const confirm = useConfirm();


  const {

    serviceAreas = [],

    fetchTyres,
    deleteTyre,
    updateTyreImage,
    updateTyreStock,
    updateTyrePrices,
    addTyre,
    fetchServiceAreas,
    addServiceArea,
    removeServiceArea,



    logoutAdmin,
    contactMessages,
    fetchMessages,
    deleteMessage,
    clearMessages,
    blogs = [],
    fetchBlogs,
    addBlog,
    deleteBlog
  } = useAdminStore();

  const { coupons, fetchCoupons, addCoupon, deleteCoupon } = useShopStore();



  const [couponCode, setCouponCode] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [minimumAmount, setMinimumAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");



  const handleAddCoupon = async () => {
    const formData = new FormData();
    formData.append("code", couponCode);
    formData.append("discountType", discountType);
    formData.append("discountValue", discountValue);
    formData.append("minimumAmount", minimumAmount);
    formData.append("expiryDate", expiryDate);
    await addCoupon(formData); // from your store
  };
  const handleDeleteCoupon = async (id) => {
    await deleteCoupon(id);
  }


  const [newBlog, setNewBlog] = useState({
    title: '',
    description: '',
    metaTitle: '',
    metaDescription: '',
    image: null,
  });
  const [blogImagePreview, setBlogImagePreview] = useState(null);


  const [tab, setTab] = useState('tyres');
  const [pincode, setPincode] = useState('');
  const [suburb, setSuburb] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [brandLogoPreview, setBrandLogoPreview] = useState(null);


  const [newTyre, setNewTyre] = useState({
    Brand: '',
    width: '',
    profile: '',
    rimSize: '',
    Model: '',
    Type: '',
    "LOAD/SPEED RATING": '',
    Marking: '',
    RunFlat: '',
    "Price Incl GST": '',
    "In Stock": '',
    "UNLOADING IN 24 HRS": '',



    image: null,
    brandLogo: null,
    category: ''
  });





  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [stockValue, setstockValue] = useState("")
  const [updatedPrices, setUpdatedPrices] = useState({});



  //Booking logic is hear *************************************************************************************************************

  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");

  // Fetch bookings by status
  const fetchBookings = async (status) => {
    try {
      const res = await axios.get(`/api/booking-backend/status/${status}`);
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  // Update booking status → Delivered
  const markAsDelivered = async (id) => {
    try {
      await axios.put(`/api/booking-backend/${id}/status`, { status: "delivered" });
      fetchBookings(statusFilter); // refresh
    } catch (err) {
      console.error(" Failed to update booking:", err);
    }
  };

  // Delete booking
  const deleteBooking = async (id) => {
    const ok = await confirm("Are you sure you want to delete this booking?");
    if (!ok) return;
    try {
      await axios.delete(`/api/booking-backend/${id}`);
      fetchBookings(statusFilter); // refresh
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  };

  useEffect(() => {
    fetchBookings(statusFilter);
  }, [statusFilter]);





  ////////////////////////////////////////////////////////
  useEffect(() => {
    fetchTyres();
    fetchServiceAreas();

    fetchMessages();
    fetchBlogs();
    fetchCoupons();
  }, []);

  const handleAddTyre = async () => {
    const {
      Brand,
      width,
      profile,
      rimSize,
      Model,
      Type,
      "LOAD/SPEED RATING": rating,
      Marking,
      RunFlat,
      "Price Incl GST": price,
      "In Stock": inStock,
      "UNLOADING IN 24 HRS": unloading,

      image,
      brandLogo,
      category,
    } = newTyre;

    if (
      !Brand ||
      !width ||
      !profile ||
      !rimSize ||
      !Model ||
      price === '' || price === null || price === undefined || isNaN(price) ||
      inStock === '' || inStock === null || inStock === undefined || isNaN(inStock) ||
      !image ||
      !brandLogo
    ) {
      alert("Please fill all required fields and upload an image.");
      return;
    }

    const SIZE = `${width}/${profile}R${rimSize}`; //  Convert to SIZE format

    const formData = new FormData();
    formData.append("Brand", Brand);
    formData.append("SIZE", SIZE); // This goes to backend
    formData.append("Model", Model);
    if (Type) formData.append("Type", Type);
    if (rating) formData.append("LOAD/SPEED RATING", rating);
    if (Marking) formData.append("Marking", Marking);
    if (RunFlat) formData.append("RunFlat", RunFlat);
    formData.append("Price Incl GST", price);
    formData.append("In Stock", inStock);
    if (unloading) formData.append("UNLOADING IN 24 HRS", unloading);

    formData.append("image", image);

    if (brandLogo) formData.append("brandLogo", brandLogo);
    if (category) formData.append("category", category);

    setLoading(true);

    try {
      await addTyre(formData);
      setSuccessMessage("Tyre added successfully!");

      setNewTyre({
        Brand: '',
        width: '',
        profile: '',
        rimSize: '',
        Model: '',
        Type: '',
        "LOAD/SPEED RATING": '',
        Marking: '',
        RunFlat: '',
        "Price Incl GST": '',
        "In Stock": '',
        "UNLOADING IN 24 HRS": '',

        image: null,
        brandLogo: null,
        category: ''
      });
      setImagePreview(null);
      setBrandLogoPreview(null);
    } catch (err) {
      console.error("Failed to add tyre:", err);
      alert("Something went wrong!");
    }
    finally {
      setLoading(false);
    }
  };




  const handleDelete = async (id) => {
    const ok = await confirm("Are you sure you want to delete this tyre?");
    if (!ok) return;

    setLoading(true);
    try {
      await deleteTyre(id);
      setSuccessMessage("Tyre deleted successfully!");
    } catch (err) {
      alert("Delete failed.");
    } finally {
      setLoading(false);
    }

  };

  const handleImageupdate = async (id, file) => {

    setLoading(true);
    try {
      await updateTyreImage(id, file);
      setSuccessMessage("Image updated successfully!");
    } catch (err) {
      alert("Image update failed.");
    } finally {
      setLoading(false);
    }
  }

  const handleStockupdate = async (id, stockValue) => {

    setLoading(true);
    try {
      await updateTyreStock(id, stockValue);
      setSuccessMessage("Stock updated successfully!");
    } catch (err) {
      alert("Stock update failed.");
    } finally {
      setLoading(false);
    }
  }

  const handlePriceUpdate = async (id, prices) => {
    setLoading(true);
    try {
      await updateTyrePrices(id, prices);
      setSuccessMessage("Prices updated successfully");
    } catch (err) {
      alert("Failed to update prices");
    } finally {
      setLoading(false);
    }
  };








  const handleAddServiceArea = () => {
    if (!pincode || !suburb) return;
    setLoading(true);
    try {
      addServiceArea(pincode, suburb);
      setSuccessMessage("service area added successfully");

      setPincode('');
      setSuburb('');
    }
    catch (err) {
      alert("Failed to add sevice area");
    } finally {
      setLoading(false);
    }

  };






  const handleRemoveServiceArea = async (postcode, suburb) => {
    const ok = await confirm("Are you sure you want to delete this service area ?");
    if (!ok) return;
    setLoading(true);
    try {
      removeServiceArea(postcode, suburb);
      setSuccessMessage("service area delete successfully");
    } catch (err) {
      alert("Failed to remove service area");
    } finally {
      setLoading(false);
    }

  };


  // const handleDeleteBooking = async (id) => {
  //   const ok = await confirm("Are you sure you want to delete this Booking");
  //   if (!ok) return;

  //   await deleteBooking(id);
  // };

  const handleAddBlog = async () => {
    setLoading(true);
    const { title, description, metaTitle, metaDescription, image } = newBlog;
    if (!title || !description || !image || !metaTitle || !metaDescription) {
      alert('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('metaTitle', metaTitle);
    formData.append('metaDescription', metaDescription);




    try {
      await addBlog(formData);
      setSuccessMessage("Blog added successfully");
      setNewBlog({ title: '', description: '', metaTitle: '', metaDescription: '', image: null });
      setBlogImagePreview(null);
    } catch (err) {
      alert('Failed to add blog');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    const ok = await confirm("Are you sure you want to delete this Blog ?");
    if (!ok) return;
    await deleteBlog(id);
  };

  //-------------------------------------------------------------------------------------
  //slot booking logic here  ------------------------------------
  //-----------------------------------------------------

  const [slotBookings, setSlotBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [newSlot, setNewSlot] = useState({ phase: "morning", availableSlots: 0 });
  const [loadingSlots, setLoadingSlots] = useState(false);



  useEffect(() => {
    if (selectedDate) {
      fetchSlotBookings(selectedDate);
    }
  }, [selectedDate]);

  // Fetch slot bookings by date
  const fetchSlotBookings = async (date) => {
    if (!date) {
      alert("Please select a date.");
      return;
    }

    setLoadingSlots(true);
    try {
      const res = await axios.get(`/api/slots/view?date=${date}`);
      if (res.data.bookings.length === 0) {

        alert("No slots found for this date. You can create new slots.");

      }
      setSlotBookings(res.data.bookings);
    } catch (err) {
      console.error("Failed to fetch slot bookings:", err);
      alert("Failed to fetch slot bookings.");
    } finally {
      setLoadingSlots(false);
    }
  };


  // Create or override a slot booking
  const handleCreateOrOverrideSlot = async () => {
    if (!selectedDate || !newSlot.phase || newSlot.availableSlots === undefined) {
      alert("Please fill all fields.");
      return;
    }

    setLoadingSlots(true);
    try {
      const res = await axios.post(`/api/slots/addnew`, {
        date: selectedDate,
        phase: newSlot.phase,
        availableSlots: newSlot.availableSlots,
      });
      alert(res.data.message);
      fetchSlotBookings(selectedDate); // Refresh the slots
    } catch (err) {
      console.error("Failed to create or override slot:", err);
      alert("Failed to create or override slot.");
    } finally {
      setLoadingSlots(false);
    }
  };



  // Delete a slot booking
  const handleDeleteSlot = async (id) => {
    const ok = await confirm("Are you sure you want to delete this slot?");
    if (!ok) return;

    setLoadingSlots(true);
    try {
      const res = await axios.delete(`/api/slots/delete/${id}`);
      alert(res.data.message);
      fetchSlotBookings(selectedDate); // Refresh the slots
    } catch (err) {
      console.error("Failed to delete slot:", err);
      alert("Failed to delete slot.");
    } finally {
      setLoadingSlots(false);
    }
  };



  // Update availability for a slot booking
  const handleUpdateSlotAvailability = async (id, availableSlots) => {
    if (availableSlots < 0 || availableSlots > 3) {
      alert("Available slots must be between 0 and 3.");
      return;
    }

    setLoadingSlots(true);
    try {
      const res = await axios.put(`/api/slots/update/${id}`, { availableSlots });
      alert(res.data.message);
      fetchSlotBookings(selectedDate); // Refresh the slots
    } catch (err) {
      console.error("Failed to update slot availability:", err);
      alert("Failed to update slot availability.");
    } finally {
      setLoadingSlots(false);
    }
  };







  //----------------------------------------------------
  //filter  logic here------------------------------------
  //-------------------------------------------------------------------------------------

  const [FilterTyres, setFilterTyres] = useState([]);

  const [filters, setFilters] = useState({
    width: '', profile: '', rim: '',
    brand: '', model: ''
  });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch tyres whenever filters change
  const fetchFilterTyres = async (pageNumber = 1, isNewFilter = false) => {
    setLoading(true);

    const params = { page: pageNumber, limit: 50 }; // backend pagination
    Object.keys(filters).forEach(key => {
      if (filters[key]) params[key] = filters[key];
    });

    const res = await axios.get('/api/tyreall/search', { params });

    if (isNewFilter) {
      setFilterTyres(res.data.tyres); // reset when filters change
    } else {
      setFilterTyres(prev => [...prev, ...res.data.tyres]); // append for infinite scroll
    }

    setHasMore(pageNumber < res.data.totalPages); // check if more pages exist
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchFilterTyres(1, true); // fresh fetch when filter changes
  }, [filters]);



  const observer = useRef();

  const lastTyreRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );


  useEffect(() => {
    if (page > 1) {
      fetchFilterTyres(page, false);
    }
  }, [page]);





  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const parsedSizes = filterOptions.SIZE.map(sizeStr => {
    const match = sizeStr.match(/^(\d+)\/([\d.]+)R(\d+)$/);
    return match ? { width: match[1], profile: match[2], rimSize: match[3] } : null;
  }).filter(Boolean);

  const uniqueWidths = [...new Set(parsedSizes.map(s => s.width))].sort();
  const uniqueProfiles = [...new Set(parsedSizes.map(s => s.profile))].sort();
  const uniqueRimSizes = [...new Set(parsedSizes.map(s => s.rimSize))].sort();

  const uniqueModels = FilterTyres.length > 0
    ? [...new Set(FilterTyres.map(tyre => tyre.Model))]
    : [];



  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logoutAdmin}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm sm:text-base w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {['tyres', 'service', 'contact', 'blogs', 'coupon', 'booking', 'slot-bookings'].map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded text-sm sm:text-base w-full sm:w-auto ${tab === key ? 'bg-red-600 text-white' : 'bg-gray-200'
              }`}
            onClick={() => setTab(key)}
          >
            {key.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {tab === 'tyres' && (
        <div className="space-y-6">
          {/* Loading Overlay with Blur Effect */}
          {loading && (
            <div className="fixed inset-0 h-screen backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
              <div className="bg-white px-6 py-4 rounded shadow text-lg font-semibold text-gray-700">
                Processing...
              </div>
            </div>
          )}

          {successMessage && (
            <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow z-50 flex items-center gap-2 transition-opacity duration-300">
              <span>{successMessage}</span>
              <button onClick={() => setSuccessMessage('')} className="font-bold text-lg leading-none">×</button>
            </div>
          )}

          {/*Add new tyre  */}
          <div className="bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Tyre</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Brand */}
              <div>
                <label className="text-sm font-medium text-gray-700">Brand</label>
                <input
                  type="text"
                  value={newTyre.Brand}
                  onChange={(e) => setNewTyre({ ...newTyre, Brand: e.target.value })}
                  className="w-full border px-3 py-2 rounded text-sm"
                  placeholder="e.g. MRF"
                />
              </div>

              {/* Model */}
              <div>
                <label className="text-sm font-medium text-gray-700">Model</label>
                <input
                  type="text"
                  value={newTyre.Model}
                  onChange={(e) => setNewTyre({ ...newTyre, Model: e.target.value })}
                  className="w-full border px-3 py-2 rounded text-sm"
                  placeholder="e.g. ZLX"
                />
              </div>

              {/* Width */}
              <div>
                <label className="text-sm font-medium text-gray-700">Width</label>
                <input
                  type="text"
                  value={newTyre.width}
                  onChange={(e) => setNewTyre({ ...newTyre, width: e.target.value })}
                  className="w-full border px-3 py-2 rounded text-sm"
                  placeholder="e.g. 205"
                />
              </div>

              {/* Profile */}
              <div>
                <label className="text-sm font-medium text-gray-700">Profile</label>
                <input
                  type="text"
                  value={newTyre.profile}
                  onChange={(e) => setNewTyre({ ...newTyre, profile: e.target.value })}
                  className="w-full border px-3 py-2 rounded text-sm"
                  placeholder="e.g. 55"
                />
              </div>

              {/* Rim Size */}
              <div>
                <label className="text-sm font-medium text-gray-700">Rim Size</label>
                <input
                  type="text"
                  value={newTyre.rimSize}
                  onChange={(e) => setNewTyre({ ...newTyre, rimSize: e.target.value })}
                  className="w-full border px-3 py-2 rounded text-sm"
                  placeholder="e.g. 16"
                />
              </div>

              {/* Type */}
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <input
                  type="text"
                  value={newTyre.Type}
                  onChange={(e) => setNewTyre({ ...newTyre, Type: e.target.value })}
                  className="w-full border px-3 py-2 rounded text-sm"
                  placeholder="e.g. PCR, SUV"
                />
              </div>

              {/* LOAD/SPEED RATING */}
              <div>
                <label className="text-sm font-medium text-gray-700">Load/Speed Rating</label>
                <input
                  type="text"
                  value={newTyre["LOAD/SPEED RATING"]}
                  onChange={(e) => setNewTyre({ ...newTyre, "LOAD/SPEED RATING": e.target.value })}
                  className="w-full border px-3 py-2 rounded text-sm"
                  placeholder="e.g. 91H"
                />
              </div>

              {/* Marking */}
              <div>
                <label className="text-sm font-medium text-gray-700">Marking</label>
                <input
                  type="text"
                  value={newTyre.Marking}
                  onChange={(e) => setNewTyre({ ...newTyre, Marking: e.target.value })}
                  className="w-full border px-3 py-2 rounded text-sm"
                  placeholder="Optional marking"
                />
              </div>

              {/* RunFlat */}
              <div>
                <label className="text-sm font-medium text-gray-700">RunFlat</label>
                <input
                  type="text"
                  value={newTyre.RunFlat}
                  onChange={(e) => setNewTyre({ ...newTyre, RunFlat: e.target.value })}
                  className="w-full border px-3 py-2 rounded text-sm"
                  placeholder="Yes / No"
                />
              </div>

              {/* Price Incl GST */}
              <div>
                <label className="text-sm font-medium text-gray-700">Price (Incl GST)</label>
                <input
                  type="number"
                  value={newTyre["Price Incl GST"]}
                  onChange={(e) => setNewTyre({ ...newTyre, "Price Incl GST": Number(e.target.value) })}
                  className="w-full border px-3 py-2 rounded text-sm"
                  placeholder="e.g. 4500"
                />
              </div>






              {/* In Stock */}
              <div>
                <label className="text-sm font-medium text-gray-700">In Stock</label>
                <input
                  type="number"
                  value={newTyre["In Stock"]}
                  onChange={(e) => setNewTyre({ ...newTyre, "In Stock": e.target.value })}
                  className="w-full border px-3 py-2 rounded text-sm"
                  placeholder="e.g. 20"
                />
              </div>

              {/* UNLOADING IN 24 HRS */}
              <div>
                <label className="text-sm font-medium text-gray-700">Unloading in 24 Hrs</label>
                <input
                  type="text"
                  value={newTyre["UNLOADING IN 24 HRS"]}
                  onChange={(e) =>
                    setNewTyre((prev) => ({
                      ...prev,
                      "UNLOADING IN 24 HRS": e.target.value === '' ? '' : Number(e.target.value),
                    }))
                  }
                  className="w-full border px-3 py-2 rounded text-sm"
                  placeholder="e.g. 1 / 2 / 3"
                />
              </div>

              {/*Category--- */}
              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                  value={newTyre.category}
                  onChange={(e) => setNewTyre({ ...newTyre, category: e.target.value })}
                  className="w-full border px-3 py-2 rounded text-sm"
                >
                  <option value="">Select Category</option>
                  <option value="Premium">Premium</option>
                  <option value="Mid-Range">Mid-Range</option>
                  <option value="Budget">Budget</option>

                </select>
              </div>



              {/* Image Upload */}
              <div>
                <label className="text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setNewTyre({ ...newTyre, image: file });
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </div>


              {/* Image Preview */}
              {imagePreview && (
                <div className="flex items-center">
                  <img src={imagePreview} alt="Preview" className="w-28 h-28 object-contain border rounded" />
                </div>
              )}

              {/* Brand Logo Upload */}
              <div>
                <label className="text-sm font-medium text-gray-700">Brand Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setNewTyre({ ...newTyre, brandLogo: file });
                      setBrandLogoPreview(URL.createObjectURL(file)); // optional preview
                    }
                  }}
                  className="w-full border px-3 py-2 rounded text-sm"
                />

                {/* Preview (optional) */}
                {brandLogoPreview && (
                  <img
                    src={brandLogoPreview}
                    alt="Brand Logo Preview"
                    className="mt-2 h-16 object-contain"
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 text-right">
              <button
                onClick={handleAddTyre}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium transition"
              >
                Add Tyre
              </button>
            </div>
          </div>


          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <h3>Filter Tyre :</h3>

            <select
              value={filters.brand}
              name='brand'
              onChange={handleFilterChange}
              className={`w-full md:w-60 border ${filters.brand ? "bg-gray-200" : ""} border-gray-500 rounded px-3 py-2`}
            >
              <option value="">All Brands</option>
              {filterOptions.Brand.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <select
              value={filters.model}
              name='model'
              onChange={handleFilterChange}
              className={`w-full md:w-60 border ${filters.model ? "bg-gray-200" : ""} border-gray-500 rounded px-3 py-2`}
            >
              <option value="">All Models</option>
              {uniqueModels.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>



            <select
              name="width"
              placeholder="Width"
              value={filters.width}
              onChange={handleFilterChange}
              className={`w-full md:w-60 border ${filters.width ? "bg-gray-200" : ""} border-gray-500 rounded px-3 py-2`}
            >
              <option value="">All Width</option>

              {/* Sort the uniqueWidths numerically and render as options */}
              {uniqueWidths.sort((a, b) => a - b).map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>

            <select type="number"
              name="profile"
              placeholder="Profile"
              value={filters.profile}
              onChange={handleFilterChange}
              className={`w-full md:w-60 border ${filters.profile ? "bg-gray-200" : ""} border-gray-500 rounded px-3 py-2`}
            >

              <option value="">All Profile</option>

              {uniqueProfiles.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))

              }

            </select>
            <select type="number"
              name="rim"
              placeholder="Rim Size"
              value={filters.rim}
              onChange={handleFilterChange}
              className={`w-full md:w-60 border ${filters.rim ? "bg-gray-200" : ""} border-gray-500 rounded px-3 py-2`}
            >

              <option value="">All Rimsize</option>

              {uniqueRimSizes.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))

              }

            </select>



          </div>

          {/* Tyre Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FilterTyres.map((tyre, index) => {
              const isLastElement = index === FilterTyres.length - 1;

              return (


                <div key={tyre._id} ref={isLastElement ? lastTyreRef : null} className="border rounded-lg p-4 bg-white shadow-md space-y-2">
                  <img
                    src={tyre.image_url}
                    alt={`${tyre.Brand} ${tyre.Model}`}
                    className="w-full h-32 object-contain mb-2"
                  />
                  <div className="text-sm">
                    <p><strong>Brand:</strong> {tyre.Brand}</p>
                    <p><strong>Model:</strong> {tyre.Model}</p>
                    <p><strong>Size:</strong> {tyre.SIZE}</p>
                    <p><strong>Load/Speed:</strong> {tyre["LOAD/SPEED RATING"]}</p>
                    <p><strong>Type:</strong> {tyre.Type}</p>
                    <p><strong>Marking:</strong> {tyre.Marking || 'N/A'}</p>
                    <p><strong>RunFlat:</strong> {tyre.RunFlat || 'N/A'}</p>
                    <p><strong>Price:</strong> ${tyre["Price Incl GST"]}</p>
                    <p><strong>Price for 1:</strong> ${tyre["Price for 1"] || 'N/A'}</p>
                    <p><strong>Price for 2:</strong> ${tyre["Price for 2"] || 'N/A'}</p>
                    <p><strong>Price for 3:</strong> ${tyre["Price for 3"] || 'N/A'}</p>
                    <p><strong>Price for 4:</strong> ${tyre["Price for 4"] || 'N/A'}</p>
                    <p><strong>Price for 5:</strong> ${tyre["Price for 5"] || 'N/A'}</p>

                    <p><strong>In Stock:</strong> {tyre["In Stock"]}</p>
                    <p><strong>Unloading in 24 Hrs:</strong> {tyre["UNLOADING IN 24 HRS"]}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {/* Delete */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDelete(tyre._id)}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Delete Tyre"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>

                    {/* Image Upload */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) handleImageupdate(tyre._id, file);
                      }}
                      className="block w-full text-sm text-gray-700"
                    />


                    {/* Price Update */}
                    <div className="space-y-1">
                      {["Price for 1", "Price for 2", "Price for 3", "Price for 4", "Price for 5"].map((label) => (
                        <div key={label} className="flex items-center gap-1">
                          <label className="text-xs w-20">{label}:</label>
                          <input
                            type="number"
                            defaultValue={tyre[label]}
                            onChange={(e) => {
                              const newPrice = e.target.value.trim();
                              setUpdatedPrices((prev) => ({
                                ...prev,
                                [tyre._id]: {
                                  ...(prev[tyre._id] || {}),
                                  [label]: newPrice
                                }
                              }));
                            }}
                            className="w-20 border px-1 py-0.5 rounded text-xs"
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          if (updatedPrices[tyre._id]) {
                            handlePriceUpdate(tyre._id, updatedPrices[tyre._id]);
                          }
                        }}
                        className="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700"
                      >
                        Update Prices
                      </button>
                    </div>



                    {/* Stock Update */}
                    <div className="flex gap-1 items-center">
                      <input
                        type="text"
                        placeholder="Stock"
                        defaultValue={tyre["In Stock"]}
                        onChange={(e) => {
                          setstockValue(e.target.value.trim())
                        }}
                        className="w-16 border px-1 py-0.5 rounded text-xs"
                      />
                      <button
                        onClick={() => {

                          if (stockValue !== undefined && stockValue !== "" && stockValue !== tyre["In Stock"]) {
                            handleStockupdate(tyre._id, stockValue);
                          }
                        }}
                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Update
                      </button>
                    </div>


                  </div>
                </div>
              )
            })}
          </div>




        </div>
      )}

      {tab === 'service' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {loading && (
              <div className="fixed h-screen inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
                <div className="bg-white px-6 py-4 rounded shadow text-lg font-semibold text-gray-700">
                  Processing...
                </div>
              </div>
            )}
            {successMessage && (
              <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow z-50 flex items-center gap-2 transition-opacity duration-300">
                <span>{successMessage}</span>
                <button onClick={() => setSuccessMessage('')} className="font-bold text-lg leading-none">×</button>
              </div>
            )}
            {serviceAreas.length > 0 ? (
              serviceAreas.map((area, idx) => (
                <div key={idx} className="flex items-center justify-between border px-4 py-2 rounded shadow bg-white">
                  <span>{area.postcode}, {area.suburb}</span>
                  <button
                    onClick={() => handleRemoveServiceArea(area.postcode, area.suburb)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No service areas found.</p>
            )}
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="border px-2 py-2 rounded w-full sm:w-auto text-sm"
            />
            <input
              type="text"
              placeholder="Suburb"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              className="border px-2 py-2 rounded w-full sm:w-auto text-sm"
            />
            <button
              onClick={handleAddServiceArea}
              className="bg-red-600 text-white px-3 py-2 rounded text-sm w-full sm:w-auto"
            >
              Add Service Area
            </button>
          </div>
        </div>
      )}




      {tab === 'contact' && (
        <div className="space-y-4">
          {loading && (
            <div className="fixed h-screen inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
              <div className="bg-white px-6 py-4 rounded shadow text-lg font-semibold text-gray-700">
                Processing...
              </div>
            </div>
          )}
          {successMessage && (
            <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow z-50 flex items-center gap-2 transition-opacity duration-300">
              <span>{successMessage}</span>
              <button onClick={() => setSuccessMessage('')} className="font-bold text-lg leading-none">×</button>
            </div>
          )}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Contact Messages</h2>
            <button
              onClick={() => {
                if (window.confirm("Clear all messages?")) clearMessages();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Clear All
            </button>
          </div>

          {contactMessages.length === 0 ? (
            <p className="text-gray-500">No messages found.</p>
          ) : (
            contactMessages.map((msg) => (
              <div key={msg._id} className="border p-4 rounded shadow bg-white">
                <p className="text-sm">
                  <strong>Name:</strong> {msg.name}
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> {msg.email}
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> {msg.phone}
                </p>
                <p className="text-sm">
                  <strong>Subject:</strong> {msg.subject}
                </p>
                <p className="text-sm mt-2"> <strong>Message: </strong>{msg.message}</p>
                <button
                  onClick={() => {
                    if (window.confirm("Delete this message?")) deleteMessage(msg._id);
                  }}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
      {tab === 'blogs' && (
        <div className="space-y-6">
          {loading && (
            <div className="fixed h-screen inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
              <div className="bg-white px-6 py-4 rounded shadow text-lg font-semibold text-gray-700">
                Processing...
              </div>
            </div>
          )}
          {successMessage && (
            <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow z-50 flex items-center gap-2 transition-opacity duration-300">
              <span>{successMessage}</span>
              <button onClick={() => setSuccessMessage('')} className="font-bold text-lg leading-none">×</button>
            </div>
          )}
          {/* Blog List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className="border p-4 rounded shadow bg-white">
                  {blog.image && (
                    <img src={blog.image} alt="blog" className="w-full h-40 object-cover rounded mb-2" />
                  )}
                  <h2 className="text-lg font-semibold">{blog.title}</h2>
                 
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="mt-3 bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No blogs found.</p>
            )}
          </div>

          {/* Add New Blog */}
          <div className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-semibold mb-4">Add New Blog</h2>
            <div className="grid grid-cols-1 gap-3 mb-4">
              <input
                type="text"
                placeholder="Title"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="border px-2 py-2 rounded text-sm"
              />
              {/* TipTap Rich Text Editor */}
              <RichTextEditor
                content={newBlog.description}
                setContent={(html) => setNewBlog({ ...newBlog, description: html })}
              />
              {/*  Meta Title */}
              <input
                type="text"
                placeholder="Meta Title"
                value={newBlog.metaTitle || ""}
                onChange={(e) => setNewBlog({ ...newBlog, metaTitle: e.target.value })}
                className="border px-2 py-2 rounded text-sm"
              />

              {/*  Meta Description */}
              <textarea
                placeholder="Meta Description"
                value={newBlog.metaDescription || ""}
                onChange={(e) => setNewBlog({ ...newBlog, metaDescription: e.target.value })}
                className="border px-2 py-2 rounded text-sm"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setNewBlog({ ...newBlog, image: file });
                    setBlogImagePreview(URL.createObjectURL(file));
                  }
                }}
                className="border px-2 py-2 rounded text-sm"
              />
              {blogImagePreview && (
                <img src={blogImagePreview} alt="Preview" className="w-32 h-32 object-contain border rounded" />
              )}
            </div>

            <button
              onClick={handleAddBlog}
              className="bg-red-600 text-white px-4 py-2 rounded text-sm"
            >
              Add Blog
            </button>
          </div>
        </div>
      )}

      {tab === 'coupon' && (
        <div className="space-y-4">
          {/* List of Coupons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {loading && (
              <div className="fixed h-screen inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
                <div className="bg-white px-6 py-4 rounded shadow text-lg font-semibold text-gray-700">
                  Processing...
                </div>
              </div>
            )}
            {successMessage && (
              <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow z-50 flex items-center gap-2 transition-opacity duration-300">
                <span>{successMessage}</span>
                <button onClick={() => setSuccessMessage('')} className="font-bold text-lg leading-none">×</button>
              </div>
            )}
            {coupons.length > 0 ? (
              coupons.map((coupon, idx) => (
                <div
                  key={idx}
                  className="w-64 bg-white rounded-xl shadow-md p-4 flex flex-col  border border-gray-200"
                >
                  {/* Coupon Code */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-800">{coupon.code}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discountValue}% OFF`
                        : `$${coupon.discountValue} OFF`}
                    </span>
                  </div>

                  {/* Coupon Details */}
                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p>Min Order: <span className="font-medium">${coupon.minimumAmount}</span></p>
                    <p>
                      Expires:{" "}
                      <span className="font-medium">
                        {new Date(coupon.expiryDate).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleDeleteCoupon(coupon._id)}
                      className="text-red-500 text-xs font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>

              ))
            ) : (
              <p className="text-gray-500">No coupons found.</p>
            )}
          </div>

          {/* Add Coupon Form */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border px-2 py-2 rounded text-sm"
            />
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="border px-2 py-2 rounded text-sm"
            >
              <option value="percentage">Percentage</option>
              <option value="flat">Flat</option>
            </select>
            <input
              type="number"
              placeholder="Discount Value"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              className="border px-2 py-2 rounded text-sm"
            />
            <input
              type="number"
              placeholder="Minimum Amount"
              value={minimumAmount}
              onChange={(e) => setMinimumAmount(e.target.value)}
              className="border px-2 py-2 rounded text-sm"
            />
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="border px-2 py-2 rounded text-sm"
            />
            <button
              onClick={handleAddCoupon}
              className="bg-red-600 text-white px-3 py-2 rounded text-sm"
            >
              Add Coupon
            </button>
          </div>
        </div>
      )}

      {
        tab === 'booking' && (

          <div className="p-6">
            {/* Toggle Buttons */}
            <div className="flex overflow-x-auto space-x-4 pb-4">
              <button
                onClick={() => setStatusFilter("pending")}
                className={`px-4 py-2 rounded-lg font-semibold ${statusFilter === "pending" ? "bg-red-600 text-white" : "bg-gray-200"
                  }`}
              >
                Pending
              </button>
              <button
                onClick={() => setStatusFilter("delivered")}
                className={`px-4 py-2 rounded-lg font-semibold ${statusFilter === "delivered"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
                  }`}
              >
                Delivered
              </button>
            </div>

            {/* Booking Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookings.length === 0 ? (
                <p className="text-gray-500">No bookings found.</p>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="border rounded-xl shadow-md p-4 bg-white"
                  >
                    <h2 className="text-lg font-bold mb-2">
                      Order #{booking.orderId}
                    </h2>
                    <p>
                      <span className="font-semibold">Customer:</span>{" "}
                      {booking.customer.firstName} {booking.customer.lastName}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span>{" "}
                      {booking.customer.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {booking.customer.email}
                    </p>
                    <p>
                      <span className="font-semibold">Street Address:</span>{" "}
                      {booking.address.address}
                    </p>
                    <p>
                      <span className="font-semibold">Suburb:</span>{" "}
                      {booking.address.suburb}
                    </p>
                    <p>
                      <span className="font-semibold">Post Code:</span>{" "}
                      {booking.address.postcode}
                    </p>
                    <p>
                      <span className="font-semibold">Date:</span>{" "}
                      {booking.selectedDate} at {booking.selectedTime}
                    </p>
                    <p>
                      <span className="font-semibold">Booking time:</span>{" "}
                      {booking.selectedTime}
                    </p>
                    <p>
                      <span className="font-semibold">Vehicle Number:</span>{" "}
                      {booking.vehicle.vehicleDetails}
                    </p>
                    <p>
                      <span className="font-semibold">Vehicle Colour:</span>{" "}
                      {booking.vehicle.colour}
                    </p>
                    <p>
                      <span className="font-semibold">Vehicle Make:</span>{" "}
                      {booking.vehicle.make}
                    </p>
                    <p>
                      <span className="font-semibold">Vehicle Model:</span>{" "}
                      {booking.vehicle.model}
                    </p>
                    <p>
                      <span className="font-semibold">Coupon code:</span>{" "}
                      {booking.appliedCoupon}
                    </p>
                    <p>
                      <span className="font-semibold">Total Cost:</span>{" "}
                      {booking.total}
                    </p>
                    <p>
                      <span className="font-semibold">Final Cost After Coupon Code:</span>{" "}
                      {booking.finalAmount ? booking.finalAmount : booking.total}
                    </p>

                    <p>
                      <span className="font-semibold">Tyres For Replacement:</span>{" "}
                      {booking.selectedTyres}
                    </p>
                    <p className="font-semibold mt-2">Selected Tyres Model:</p>
                    <ul className="list-disc ml-6 text-sm">
                      {booking.cart.map((item, idx) => (
                        <li key={idx}>
                          {item.brand} {item.model} ({item.width}/{item.profile} R{item.rimSize}) x {item.quantity}{" "}
                          - <b>Marking:</b> {item.Marking || "N/A"}{" "}
                          - <b>RunFlat:</b> {item.RunFlat?.toLowerCase() === "yes" ? "Yes" : "No"}
                          - <b>Rating:</b> {item.rating || ""}    </li>
                      ))}
                    </ul>



                    {/* Buttons */}
                    <div className="flex justify-between mt-4">
                      {statusFilter === "pending" && (
                        <button
                          onClick={() => markAsDelivered(booking._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                        >
                          Mark Delivered
                        </button>
                      )}
                      <button
                        onClick={() => deleteBooking(booking._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        )
      }



      {tab === 'slot-bookings' && (
        <div className="space-y-6">
          {/* Loading Overlay */}
          {loadingSlots && (
            <div className="fixed inset-0 h-screen backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
              <div className="bg-white px-6 py-4 rounded shadow text-lg font-semibold text-gray-700">
                Processing...
              </div>
            </div>
          )}

          {/* View Slots by Date */}
          <div className="bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">View Slot Bookings</h2>
            <div className="flex items-center gap-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border px-3 py-2 rounded text-sm"
              />
              <button
                onClick={() => fetchSlotBookings(selectedDate)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Fetch Slots
              </button>
            </div>
            {/* Slot Bookings List */}
            <div className="mt-6 space-y-4">
              {slotBookings.length === 0 ? (
                <p className="text-gray-500">No slots found for this date.</p>
              ) : (
                slotBookings.map((slot) => (
                  <div
                    key={slot._id}
                    className="border rounded-lg p-4 bg-gray-50 shadow-md flex justify-between items-center"
                  >
                    <div>
                      <p><strong>Phase:</strong> {slot.phase}</p>
                      <p><strong>Available Slots:</strong> {slot.availableSlots}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteSlot(slot._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          const newAvailability = prompt(
                            "Enter new availability (0-3):",
                            slot.availableSlots
                          );
                          if (newAvailability !== null) {
                            handleUpdateSlotAvailability(slot._id, Number(newAvailability));
                          }
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Create or Override Slot */}
          <div className="bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create or Override Slot</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={newSlot.phase}
                onChange={(e) => setNewSlot({ ...newSlot, phase: e.target.value })}
                className="border px-3 py-2 rounded text-sm"
              >
                <option value="morning">Morning</option>
                <option value="lunch">Lunch</option>
                <option value="afternoon">Afternoon</option>
              </select>
              <input
                type="number"
                value={newSlot.availableSlots}
                onChange={(e) => setNewSlot({ ...newSlot, availableSlots: Number(e.target.value) })}
                className="border px-3 py-2 rounded text-sm"
                placeholder="Available Slots (0-3)"
              />
              <button
                onClick={handleCreateOrOverrideSlot}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Create/Override Slot
              </button>
            </div>
          </div>
        </div>
      )}





    </div>

  );
}
