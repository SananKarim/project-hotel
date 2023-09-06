// bookingModel.js

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  reservation_date: {
    type: Date,
    required: true,
  },
  // Add other fields specific to the Bookings collection
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
