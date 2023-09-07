const jwt = require("jsonwebtoken");
const Customer = require("../model/customerRegister");
const Owner = require("../model/ownerRegister");

const dotenv = require("dotenv");
const { connectToDatabase } = require("../db/db");

dotenv.config();

const requireAuth = () => {
  return async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      let User;

      try {
        const decodedToken = await jwt.verify(token, process.env.secret_key);
        console.table(decodedToken.userId);
        if (decodedToken.role === "owner") {
          connectToDatabase();
          User = await Owner.findById(decodedToken.userId);
        } else if (decodedToken.role === "customer") {
          connectToDatabase();
          User = await Customer.findById(decodedToken.userId);
        }
        if (!User) {
          throw new Error("User not found");
        }

        req.user = User;
        console.log(req.user._id);
        next();
      } catch (err) {
        console.error(err.message);
        res.status(401).json({ error: "Authentication failed" });
      }
    } else {
      res.status(401).json({ error: "Bearer token required" });
    }
  };
};

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.secret_key);

    if (decodedToken.role === "customer") {
      user = await Customer.findById(decodedToken.id);
    } else if (decodedToken.role === "owner") {
      user = await Owner.findById(decodedToken.id);
    }
    res.locals.user = user;
    next();
  } catch (err) {
    console.error(err.message);
    res.locals.user = null;
    next();
  }
};

module.exports = {
  requireAuth,
  checkUser,
};
