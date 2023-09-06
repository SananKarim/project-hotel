
const { validateSignup, validateSignin } = require("../rules/rules");

function validateRequestSignUp(req, res, next) {
  const { error, value } = validateSignup(req.body);
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(422).json({
      errortype: "joi validation",
      error: errorMessages,
    });
  } else {
    next();
  }
}
function validateRequestSignIn(req, res, next) {
  const { error, value } = validateSignin(req.body);
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(422).json({
      errortype: "joi validation",
      error: errorMessages,
    });
  } else {
    next();
  }
}
module.exports = {
  validateRequestSignUp,
  validateRequestSignIn,
};
