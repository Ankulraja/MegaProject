const Course = require("../Model/Course");
const { findById } = require("../Model/Profile");
const Category = require("../Model/Category");
const User = require("../Model/User");
const { uploadToCloudinary } = require("../Utils/ImageUploader");
require("dotenv").config();
const mongoose = require("mongoose");

// const Tag = require("../Model/Category");
exports.createCourse = async (req, res) => {
  try {
    // Fetch The Data
    // Here Category is a Id not String
    console.log("Ha Aaya 1");

    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      tags,
      status,
      instructions,
    } = req.body;
    const thumbnail = req.files.thumbnail;
    //   Validity check
    console.log(
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      tags,
      thumbnail,instructions,status,
    );
    if (
      !courseDescription ||
      !courseName ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail || !instructions || !status
    ) {
      return res.status(400).json({
        success: false,
        message: "All Field required",
      });
    }
    console.log("1");
    // Check For instructor
    const userId = req.user.id;
    // const instructor = await findById({_id:userId})
    const instructor = await User.findById(userId);
    console.log("2");
    // console.log("instructor detail", instructor);
    if (!instructor) {
      return res.status(400).json({
        success: false,
        message: "Not A Valid instructor",
      });
    }
    // Find Tagdetail here tag as an ID store
    const categoryDetail = await Category.findById(category);
    console.log("3");
    console.log(categoryDetail);

    if (!categoryDetail) {
      return res.status(400).json({
        success: false,
        message: "Not A Valid CategoryDetail",
      });
    }
    // console.log("Thumb........", thumbnail);
    // console.log("Thumb........", process.env.FOLDER_NAME);
    // Upload Image To Cloudinary
    const thumbnailImage = await uploadToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    console.log("4");

    // console.log(instructor._id);
    // console.log(categoryDetail._id);
    // console.log(thumbnailImage.secure_url);
    //    create Course In DB
    try {
      var newCourse = await Course.create({
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        tags: tags,
        instructor: instructor._id,
        category: categoryDetail._id,
        thumbnail: thumbnailImage.secure_url,
        instructions,
        status,
      });
    } catch (e) {
      console.log("error: " + e.message);
      console.log("error: " + e);
    }

    console.log("5");

    // Add New Course To the user Schema of Instructor
    const instructorDetail = await User.findByIdAndUpdate(
      { _id: instructor._id },
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );
    console.log("6");

    // update in Tag courses;

    const updateTags = await Category.findByIdAndUpdate(
      { _id: categoryDetail._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    console.log("7");

    // return Response
    return res.status(200).json({
      success: true,
      newCourse,
      message: "Courses Created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in Course Creating",
    });
  }
};

// get All Course
exports.getAllCourse = async (req, res) => {
  try {
    const allCourse = await Course.find(
      {},
      {
        courseName: true,
        instructor: true,
        price: true,
        thumbnail: true,
        ratingAndReview: true,
        StudentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    if (!allCourse) {
      return res.status(400).json({
        success: false,
        allCourse,
        message: "All Course Not found successfully",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All Course found successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in finding the courses",
    });
  }
};

// Get Course Full Detail Without Their Object ID
exports.getCourseDetails = async (req, res) => {
  try {
    //get id
    console.log("1");
    const { courseId } = req.body;
    //find course details
    console.log("2");
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          //select: "-videoUrl",
        },
      })
      .exec();

    //validation
    console.log("3");
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }
    console.log("4");
    // let totalDurationInSeconds = 0;
    // courseDetails.courseContent.forEach((content) => {
    //   content.subSection.forEach((subSection) => {
    //     const timeDurationInSeconds = parseInt(subSection.timeDuration);
    //     totalDurationInSeconds += timeDurationInSeconds;
    //   });
    // });

    // const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    //return response
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log("Ha Aaya 1",courseId);
    const updates = req.body;
    console.log("Update", updates);
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumbnail;
      const thumbnailImage = await uploadToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        course[key] = updates[key];
        // if (key === "tag" || key === "instructions") {
        //   course[key] = JSON.parse(updates[key])
        // } else {
        //   course[key] = updates[key]
        // }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 }).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    })
    .exec()

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}