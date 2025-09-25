const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customer: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
    },
    address: {
      address: String,
      suburb: String,
      postcode: String,
    },
    vehicle: {
      vehicleDetails: String,
      state: String,
      colour: String,
      make: String,
      model: String,
    },
    cart: [
      {
        brand: String,
        model: String,
        width: String,
        profile: String,
        rimSize: String,
        Type: String,
        rating: String,
        RunFlat: String,
        Marking: String,
        quantity: Number,
        price: Number,
      },
    ],
    selectedTyres: [String],
    selectedDate: { type: String, required: true },
    selectedTime: { type: String, required: true },
    appliedCoupon: { type: String, default: null },
    total: Number,
    finalAmount: Number,

    status: { type: String, enum: ["pending", "delivered"], default: "pending" }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
