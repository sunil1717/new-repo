const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

//  Update booking status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "delivered"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Status updated successfully", booking: updatedBooking });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Fetch bookings by status
router.get("/status/:status", async (req, res) => {
  try {
    const { status } = req.params;

    if (!["pending", "delivered"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const bookings = await Booking.find({ status }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete booking by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
