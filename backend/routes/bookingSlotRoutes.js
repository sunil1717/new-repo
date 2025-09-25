// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();

const { bookSlot,
    checkAvailability,
    viewBookingsByDate,
    createOrOverrideBooking,
    deleteBookingById,
    updateAvailabilityById, } = require("../controllers/bookingSlotController");

// POST - create slots for a date
router.post("/create", bookSlot);
router.post("/check", checkAvailability);
router.get("/view", viewBookingsByDate); 
router.post("/addnew", createOrOverrideBooking);
router.delete("/delete/:id", deleteBookingById); 
router.put("/update/:id", updateAvailabilityById);

module.exports = router;
