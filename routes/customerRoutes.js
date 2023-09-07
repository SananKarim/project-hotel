const { Router } = require("express");

const authControllerCustomer = require("../controllers/authControllerCustomer");
const { validateRequestSignUp } = require("../middleware/joiValidation.js");
const { requireAuth } = require("../middleware/jwtValidation");

const customerRouter = Router();

customerRouter.post(
  "/signup",
  validateRequestSignUp,
  authControllerCustomer.signup_post
);
customerRouter.post("/signin", authControllerCustomer.signin_post);

customerRouter.get("/profile", requireAuth(), authControllerCustomer.profile_get);

module.exports = customerRouter;
