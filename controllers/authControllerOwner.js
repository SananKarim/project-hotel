const { write, getByEmail } = require("../db/crudOwner");
const { connectToDatabase } = require("../db/db");
const ownerRegister = require("../model/ownerRegister");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports.signup_post = async (req, res) => {
  try {
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
    const user = await ownerRegister.login(email, password);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed.User Doesn't Exsit" });
    }
    // If the login is successful, generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: "owner" },
      process.env.secret_key,
      {
        expiresIn: "1h",
      }
    );

    // Return the token along with the user object
    return res.status(201).json({ message: "Login Successful", token: token });
  } catch (error) {
    return res.status(500).json({ message: "Authentication failed" });
  }
};

