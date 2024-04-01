const Profile = require("../Model/Profile");
const User = require("../Model/User");
const { uploadToCloudinary } = require("../Utils/ImageUploader");
require("dotenv").config();
// Profile Already Exists only updates need No need Of creation

exports.updateProfile = async (req, res) => {
  try {
    const { gender, dateOfBirth = "", about = "", contactNumber } = req.body;
    const id = req.user.id;
    if (!id || !gender || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required feild",
      });
    }
    console.log("0");

    // Find Profile Id
    const userDetail = await User.findById(id);

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
    const profilePhoto = req.files.profilePhoto;
    if (!userId || !profilePhoto) {
      return res.status(403).json({
        success: false,
        message: "Required Data Not Found",
      });
    }
    //  Upload profile photo in Clodinary;
    const uploadPhoto = await uploadToCloudinary(
      profilePhoto,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    const user=  await User.findByIdAndUpdate(
      userId,
      { image: uploadPhoto.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      user
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error while uploading profile photo",
    });
  }
};

//
