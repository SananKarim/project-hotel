// ownerModel.js

const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: String,
  contact: {
    type: String,
    required: true,
  },
  address: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },

});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
