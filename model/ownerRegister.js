const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ownerRegisterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

ownerRegisterSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

ownerRegisterSchema.statics.login = async function (email, password) {
  try {

    
    const user = await this.findOne({ email });
    console.log("testing");
    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    throw error; // You can handle different error types at a higher level
  }
};

const ownerRegister = mongoose.model("ownerRegister", ownerRegisterSchema);

module.exports = ownerRegister;
