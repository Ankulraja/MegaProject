// Send OTP

const User = require("../Model/User");
const OTP = require("../Model/OTP");
const OtpGen = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../Model/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.OtpGenerator = async (req, res) => { 
  try {
    const { email } = req.body;
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    var otp = OtpGen.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otp);
    let result = await OTP.findOne({ otp });
    while (result) {
      var otp = OtpGen.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      let result = await OTP.findOne({ otp });
    }
    
    // const otpPayload = {
    //   email,
    //   otp,
    // };
    //const otpBody= await OTP.create(otpPayload);
    const otpBody = await OTP.create({ email, otp });
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Error in Sending The OTP",
      otp,
    });
  }
};

// SignUp
exports.signup = async (req, res) => {
  // Fetch The Data
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      accountType,
      // contactNumber,
      otp,
    } = req.body;

    // Validate The Data
    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "Fill All the Fields",
      });
    }

    // Match Password and confirm Password
    if (confirmPassword !== password) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password Are Not Match,Please Try Again",
      });
    }

    // Check User Exist Or Not
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      return res.status(401).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // Find Most Recent OTP
    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("Recent Otp",recentOtp);

    // Validate The Recent Otp
    if (!recentOtp) {
      return res.status(401).json({
        success: false,
        message: "Otp not found",
      });
    }
    
    // Match The OTP
    if (otp !== recentOtp.otp) {
      return res.status(401).json({
        success: false,
        message: "Otp Not Match",
      });
    }
    
    console.log("Hash Pass")
    // Hash The Password
    const hashPassword = await bcrypt.hash(password, 10);
    
   console.log(hashPassword);
    // Create the Entry in DB
    const userPayload = {};
    // const entry = await User.create({
    //     email,
    //     firstName,
    //     lastName,
    //     password:hashPassword,
    //     accountType,
    //     contactNumber,
    // })
    // console.log(entry);
    // const user= await User.create({entry});
    console.log("Profile")
    const profileData = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    console.log(profileData._id)
    console.log("create User")
    // console.log(firstName + " " + lastName + " " + email + " " + accountType);
    let userData;
    try{
      userData = await User.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        accountType,
        additionalDetails: profileData._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      })
    }catch(e){
      console.log("error in signup  ",e)
    }
    
    // return response
    return res.status(200).json({
      success: true,
      message: "Signeup Successfully",
      userData
    });
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "Signup failed",
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    // Fetch The Data
    const { email, password } = req.body;
    // Validate The Data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Fill All The Fields",
      });
    }
   
    // Check Wheather user Exist or Not Exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found, please Signup ",
      });
    } 
   
     
    // Check Password
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(401).json({
        success: false,
        message: "Password Not Match",
      });
    }
 
   
    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Login Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// Change Password

exports.changePassword = async (req, res) => {
  try {
    const { email, password, newPassword, confirmPassword } = req.body;

    if (!confirmPassword || !newPassword || !password || !email) {
      return res.status(500).json({
        success: false,
        message: "Fill All Fields",
      });
    }
    if (confirmPassword !== newPassword) {
      return res.status(500).json({
        success: false,
        message: "Password not Match",
      });
    }

    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(500).json({
        success: false,
        message: "User Not Found",
      });
    }
    const passCheck = await bcrypt.compare(password, userData.password);
    if (!passCheck) {
      return res.status(500).json({
        success: false,
        message: "Given Password is incorrect ",
      });
    }

     // Hash New Password
    const hashPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate(
      { email },
      { password: hashPassword },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "User password updated successfully" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error occour in Password Change",
    });
  }
};
