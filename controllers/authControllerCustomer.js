const { write, getByEmail } = require("../db/crudCustomer");
const { connectToDatabase } = require("../db/db");
const customerRegister = require("../model/customerRegister");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

module.exports.signup_post = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await getByEmail(email);

    if (existingUser) {
      console.log("email is exsiting ");
      return res
        .status(409)
        .json({ errortype: "DB error", error: "User already exists." });
    } else {
      const userData = { username, email, password };

      // Create a new user
      const newUser = await write(userData);

      console.log("New ID: " + newUser._id + " is created");
      res
        .status(201)
        .json({ message: "User created successfully.", id: newUser._id });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};
module.exports.signin_post = async (req, res) => {
  try {
    const { email, password } = req.body;

    connectToDatabase();
    const user = await customerRegister.login(email, password);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed.User Doesn't Exist" });
    }
    const token = jwt.sign(
      { userId: user._id, role: "customer" },
      process.env.secret_key,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({ message: "Login Successful", token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.profile_get = async (req, res) => {
  try {
    console.log("testing in getprofile");
    return res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    return res.status(400).json({ message: "Login Successful" });
  }
};
