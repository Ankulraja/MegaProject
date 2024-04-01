const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Model/User");

// auth ,isStudent ,isAdmin

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Token is Missing",
      });
    }
    console.log(token);
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    if (!payload) {
      return res.status(403).json({
        success: false,
        message: "Unauthenticate Person",
      });
    }
    req.user = payload;
   
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Authentication Process Failed",
    });
  }
};


//isStudent

exports.isStudent = async (req, res, next) => {
  try {
    const role = req.user.accountType;
    if (role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This Portal Only For Student",
      });
    }
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error in Verification of Student Portal",
    });
  }
};


// isAdmin


exports.isAdmin = async (req, res, next) => {
  try {
    const role = req.user.accountType;
    console.log("AccountType",role);
    if (role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This Portal Only For Admin",
      });
    }
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error in Verification of Admin Portal",
    });
  }
};
  

//isInstructor 


exports.isInstructor= async (req, res, next) => {
  try {
    const role = req.user.accountType;
    if (role !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This Portal Only For Instructor",
      });
    }
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error in Verification of Instructor Portal",
    });
  }
};
