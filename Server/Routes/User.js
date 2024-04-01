const express = require("express");
const router = express.Router();

const { capturePayment, verifySignature } = require("../Controller/Payment");
const {
  auth,
  isStudent,
  isAdmin,
  isInstructor,
} = require("../Middleware/Auth");

const {
  OtpGenerator,
  signup,
  login,
  changePassword,
} = require("../Controller/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../Controller/ResetPassword");



router.post("/signup", signup);
router.post("/login", login);
router.post("/OtpGenerator", OtpGenerator);
router.post("/changePassword", auth, changePassword);

// router.post("/resetPasswordToken", resetPasswordToken);
// router.post("/resetPassword", resetPassword);



module.exports = router;
