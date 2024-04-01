const Category = require("../Model/Category");
const { castObject } = require("../Model/Rating&Review");
exports.createCategory = async (req, res) => {
  try {
    // Fetch the Data From request
    const { name, description } = req.body;

    //Validate the Data
    if (!description || !name) {
      return res.status(400).json({
        success: false,
        message: "Complete All required Feild",
      });
    }

    //   Create Entry In Database
    const categoryDetail = await Category.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error in Category creation",
    });
  }
};

// Get AllCategory
exports.showAllCategory = async (req, res) => {
  try {
    // console.log("showAllCategory")
    const allCategory = await Category.find(
      {},
      { name: true, description: true }
    );
    res.status(200).json({
      success: true,
      allCategory,
      message: " All Category find successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error in Finding All Category",
    });
  }
};

// Category Page Detail
exports.categoryPageDetail = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log("PRINTING CATEGORY ID: ", categoryId);
    // Get courses for the specified category
    const selectedCourses = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    //console.log("SELECTED COURSE", selectedCourses)
    // Handle the case when the category is not found
    if (!selectedCourses) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    // Handle the case when there are no courses
    if (selectedCourses.course.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
      course: { $not: { $size: 0 } },
    });
    console.log("categoriesExceptSelected", categoriesExceptSelected);
    let differentCourses = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();
    //console.log("Different COURSE", differentCourses)
    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = await Course.find({ status: "Published" })
      .sort({ "studentsEnrolled.length": -1 })
      .populate("ratingAndReviews") // Sort by studentsEnrolled array length in descending order
      .exec();

    res.status(200).json({
      selectedCourses: selectedCourses,
      differentCourses: differentCourses,
      mostSellingCourses,
      name: selectedCourses.name,
      description: selectedCourses.description,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
