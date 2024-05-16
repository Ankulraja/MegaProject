const express = require("express");
const router = express.Router();

const {
  auth,
  isStudent,
  isAdmin,
  isInstructor,
} = require("../Middleware/Auth");
const {
  createCourse,
  getAllCourse,
  getCourseDetails,
  editCourse,
  getInstructorCourses
} = require("../Controller/Course");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../Controller/Section");
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../Controller/SubSection");
const {
  createCategory,
  showAllCategory,
  categoryPageDetail,
} = require("../Controller/Category");
const {
  createRatingAndReview,
  getAvgRating,
  getAllRatingAndReview,
} = require("../Controller/RatingAndReview");

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getAllCourse", getAllCourse);
router.post("/getCourseDetail", getCourseDetails);
router.post("/editCourse", auth, isInstructor,editCourse);


router.post("/createSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Category
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategory);
router.post("/categoryPageDetail", categoryPageDetail);

//  Rating and Review

router.post("/createRatingAndReview", auth, isStudent, createRatingAndReview);
router.get("/getAvgRating", getAvgRating);
router.post("/getAllRatingAndReview", getAllRatingAndReview);


router.get("/getInstructorCourses", auth, isInstructor,getInstructorCourses)

module.exports = router;
