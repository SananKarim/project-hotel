const jwt = require("jsonwebtoken");
const Customer = require("../model/customerRegister");
const Owner = require("../model/ownerRegister");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = "sanan karim secret code"; // Replace with your actual secret key

const requireAuth = (role) => {
  return async (req, res, next) => {
    const token = req.cookies.jwt;
    let User;

    if (role === "owner") {
      User = Owner;
    } else if (role === "customer") {
      User = Customer;
    }

    if (token) {
      try {
        const decodedToken = jwt.verify(token, secretKey);
        const user = await User.findById(decodedToken.id);

        if (!user) {
          throw new Error("User not found");
        }

        req.user = user;
        console.log(req.user._id);
        next();
      } catch (err) {
        console.error(err.message);
        res.status(401).json({ error: "Authentication failed" });
      }
    } else {
      res.status(401).json({ error: "Authentication required" });
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
    const decodedToken = jwt.verify(token, secretKey);
    
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
