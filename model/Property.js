// propertyModel.js

const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  max_people: {
    type: Number,
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
