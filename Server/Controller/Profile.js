const Profile = require("../Model/Profile");
const User = require("../Model/User");
const { uploadToCloudinary } = require("../Utils/ImageUploader");
require("dotenv").config();
const bcrypt = require("bcrypt");
// Profile Already Exists only updates need No need Of creation

exports.updateProfile = async (req, res) => {
  try {
    console.log("0");
    const {
      gender,
      dateOfBirth = "",
      about = "",
      contactNumber,
      firstName,
      lastName,
    } = req.body;
    const id = req.user.id;
    console.log("1");
    if (!id || !gender || !contactNumber || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required feild",
      });
    }
    console.log("2");

    // Find Profile Id
    const userDetail = await User.findByIdAndUpdate(
      id,
      {
        firstName: firstName,
        lastName: lastName,
      },
      {
        new: true,
      }
    );

    const profileId = userDetail.additionalDetails;
    console.log(profileId);
    const profileDetail = await Profile.findByIdAndUpdate(
      profileId,
      {
        dateOfBirth,
        gender,
        about,
        contactNumber,
      },
      { new: true }
    );
    const user = await User.findById(id).populate("additionalDetails").exec();
    console.log("1");
    // Update Profile (2nd Way To Update Profile)
    // profileDetail.dateOfBirth = dateOfBirth;
    // profileDetail.gender = gender;
    // profileDetail.about = about;
    // profileDetail.contactNumber = contactNumber;
    // console.log("2");

    // await profileDetail.save();

    return res.status(200).json({
      success: true,
      user,
      profileDetail,
      message: "Profile updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while updating profile",
    });
  }
};

// DeleteAccount

exports.deleteAccount = async (req, res) => {
  try {
    //   Fetch Id
    const id = req.user.id;
    // Validate
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required feild",
      });
    }
    // Delete Profile of that User
    const userDetail = await User.findById(id);
    const profileId = userDetail.additionalDetails;
    await Profile.findByIdAndDelete(profileId);
    // Delete User Account
    // Un enroll User from All enrolled User;
    await User.findByIdAndDelete(id);
    // Return Response
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in deleting User profile",
    });
  }
};

// getAllUserDetails
exports.getAllUserDetails = async (req, res) => {
  try {
    console.log("Welcome in Get All User Details");
    const id = req.user.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required feild",
      });
    }
    const allDetail = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      allDetail,
      message: "All details were successfully retrieved",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error in retrieving all details",
    });
  }
};

// update Profile Photo
exports.updateProfilePhoto = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("User file: " , req.body);
    console.log("User Id: " + userId);
    const img = req.files.img;
    console.log("User Id: " + img);

    console.log("profilePhoto: " + img);
    if (!userId || !img) {
      return res.status(403).json({
        success: false,
        message: "Required Data Not Found",
      });
    }
    //  Upload profile photo in Clodinary;
    const uploadPhoto = await uploadToCloudinary(
      img,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    const user = await User.findByIdAndUpdate(
      userId,
      { image: uploadPhoto.secure_url },
      { new: true }
    );
    console.log("sucees.....", user);
    res.send({
      success: true,
      message: `Image Updated successfully`,
      user,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error while uploading profile photo",
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    console.log("1");
    const id = req.user.id;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    console.log("2");
    const existentUser = await User.findById(id);
    console.log("3");
    const pass = existentUser.password;
    const checkPass = await bcrypt.compare(currentPassword, pass);

    console.log("4", checkPass);
    if (!checkPass) {
      return res.status(401).json({
        success: false,
        message: "Current password not match",
      });
    }
    console.log("5");
    const hashPassword = await bcrypt.hash(newPassword, 10);

    console.log("5.5", hashPassword);
    const updatePass = await User.findByIdAndUpdate(
      id,
      {
        password: hashPassword,
      },
      { new: true }
    );
    console.log("6");
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error while updating password",
      error: e,
    });
  }
};

exports.getEnrolledCourse = async (req, res) => {
  try {
    console.log("1")
    const userId  = req.user.id;
    console.log("2")
    if(!userId) {
      return res.status(400).json({
        success: false,
        message: "Id is Missing",
      }); 
    }
    console.log("3")

    const userDetail = await User.findById(userId).populate("courses").exec();
    if(!userDetail){
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }
    console.log("4")

    return res.status(200).json({
      success: true,
      message: "Getting All Enrolled Courses", 
      enrollCourse: userDetail.courses
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error while getting Enrollment Course",
    });
  }
};
