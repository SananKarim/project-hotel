const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customerRegisterSchema = new mongoose.Schema({
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
  },
});

customerRegisterSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

customerRegisterSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    return user;
  } else {
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error("Incorrect Password");
    } else {
      throw Error("Invalid Email & Password");
    }
  }
};

const customerRegister = mongoose.model(
  "customerRegister",
  customerRegisterSchema
);

module.exports = customerRegister;
