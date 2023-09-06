
const { Router } = require("express");

const authControllerOwner = require("../controllers/authControllerOwner");
const { validateRequestSignUp } = require("../middleware/joiValidation.js");
const { requireAuth } = require("../middleware/jwtValidation");

const ownerRouter = Router();

ownerRouter.post("/signup",validateRequestSignUp, authControllerOwner.signup_post);

ownerRouter.post("/signin", authControllerOwner.signin_post);


ownerRouter.get("/profile", requireAuth("owner"))

module.exports = ownerRouter;
