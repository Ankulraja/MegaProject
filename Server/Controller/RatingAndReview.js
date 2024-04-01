const RatingAndReview = require("../Model/Rating&Review");
const Course = require("../Model/Course");
const mongoose = require("mongoose");

// Create Rating andReview
exports.createRatingAndReview = async (req, res) => {
  try {
    const { rating, review, courseId } = req.body;
    const userId = req.user.id;
    //  Validate
    if (!userId || !courseId) {
      return res.status(404).json({
        success: false,
        message: "Required field is empty",
      });
    }
    // Check User Enrolled or not
    const courseDetail = await Course.findById({
      courseId,
      StudentEnrolled: { $elemMatch: { $eq: userId } },
    });
    // if(courseDetail.includes(userId)){ }         Also Correct
    if (!courseDetail) {
      return res.status(404).json({
        success: false,
        message: "Student Not Enrolled in this Course",
      });
    }

    // Check Is user Already reviewed or not
    const reviewDetail = await RatingAndReview.findByOne({
      user: userId,
      course: courseId,
    });
    if (reviewDetail) {
      return res.status(404).json({
        success: false,
        message: "User already reviewed",
      });
    }
    // Create review
    const response = await RatingAndReview.create({
      rating,
      review,
      user: userId,
      course: courseId,
    });
    // Update rating review in Course
    const updateCourse = await Course.findByIdAndUpdate(
      { _id: courseId },

      { $push: { ratingAndReview: response._id } },
      { new: true }
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Rating and review Created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error In create Review",
    });
  }
};

// Get Avg Rating

exports.getAvgRating = async (req, res) => {
  try {
    //  Get Course Id
    const courseId = req.body.courseId;
    // Calculate Average Rating
    const getAverageRating = await RatingAndReview.aggregate(
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),  //We will do this here because in RatingandReview Schema we have store a couse id in the form of objectId
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: rating },
        },
      }
    );
    if (getAverageRating.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: getAverageRating[0].averageRating,
        message: "Average Rating Found",
      });
    }
    return res.status(200).json({
      success: true,
      averageRating: 0,
      message: "Average Not Rating Found",
    });
    // Return Response
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in Finding Average",
    });
  }
};

// Get All Rating

exports.getAllRatingAndReview = async (req, res) => {
  try {
    const response = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email imageUrl",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();
    res.status(200).json({
      success: true,
      response,
      message: "All Rating Found",
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Error In Founding review",
    });
  }
};
