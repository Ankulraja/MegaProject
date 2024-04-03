const User = require("../Model/User");
const mailSender = require("../Utils/MailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const passwordUpdate = require("../Mail/Template/passwordUpdate");
const mongoose = require("mongoose");
// Reset Password Token

exports.resetPasswordToken = async (req, res) => {
  try {
    // fetch the email
    console.log("Comming in reset Password Token...");

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is empty",
      });
    }

    const user = await User.findOne({ email });

    // validate the email
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Given email Not registered",
      });
    }
    console.log(user);
    // generate token
    const token = crypto.randomUUID();

    console.log("token", token);

    // update in User
    const response = await User.findOneAndUpdate(
      { email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );
    console.log("1");

    if (!response) {
      return res.status(400).json({
        success: false,
        message: "Response not found",
      });
    }

    // Creating URL
    const url = `http://localhost:3000/update-password/${token}`;
    // const url = `http://localhost:3000/update-password/${token}`;
    console.log("2");
    //    Send Mail
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset link: ${url}`
    );
    console.log("3");
    // return response
    res.status(200).json({
      success: true,
      message: `Reset password mail sent successfully`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in Sending Email of reset password",
    });
  }
};

// Reset Password

exports.resetPassword = async (req, res) => {
  try {
    //    Fetch New Password and Confirm PassWord
    const { newPassword, confirmPassword, token } = req.body;
    // validate the password
    console.log("Comming in reset password", newPassword , confirmPassword);
    console.log("Token",token)
    if (!newPassword || !confirmPassword || !token) {
      return res
        .status(403)
        .json({ success: false, message: "Please enter All fields" });
    }

    // Check both password and confirm
    if (confirmPassword !== newPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Password not match" });
    }
    // Get User Detail Using Token
    console.log(token);
    const userData = await User.findOne({ token });
    console.log(userData);

    // check Expire Time 
    if (userData.resetPasswordExpires < Date.now()) {
      return res
        .status(403)
        .json({ success: false, message: "Session link is Expired" });
    }
    console.log("4")
    const hashPassword = await bcrypt.hash(newPassword, 10);
    console.log("5")
    const response = await User.findOneAndUpdate(
      { token },
      {
        password: hashPassword,
      },
      { new: true }
    );
    console.log("Complete All")
    return res
      .status(200)
      .json({ success: true, message: "SuccessFully Password Update" });
  } catch (err) {
    return res
      .status(403)
      .json({ success: false, message: "Error in reset password" });
  }
};
