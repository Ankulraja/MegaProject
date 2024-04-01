const Section = require("../Model/Section");
const Course = require("../Model/Course");

// Create a new Section
exports.createSection = async (req, res) => {
  try {
    // fetch the section
    const { sectionName, courseId } = req.body;
    // Validate The Section
    console.log("0.5");

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required feild",
      });
    }
    // Create the Section
    const result = await Section.create({ sectionName: sectionName });
    // add section id in Course
    console.log("1");
    try {
      var updatedCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $push: {
            courseContent: result._id,
          },
        },
        { new: true }
      )
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec();
    } catch (e) {
      console.log(e);
    }

    console.log("2");

    return res.status(200).json({
      success: true,
      updatedCourse,
      message: "Successfully created a new section",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in creating a new section",
    });
  }
};

// Update a section
exports.updateSection = async (req, res) => {
  try {
    // data retrive
    const { sectionName, sectionId } = req.body;
    // validate
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required feild",
      });
    }

    // Update
    console.log("1");
    console.log(sectionId);
    try {
      var result = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { sectionName: sectionName },
        { new: true }
      );
    } catch (e) {
      console.log(e);
    }

    console.log(result);
    console.log("2");
    // Return response
    return res.status(200).json({
      success: true,
      message: "Updating successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in Updating a section",
    });
  }
};

// Delete a section

exports.deleteSection = async (req, res) => {
  try {
    // const { sectionId } = req.params;
    const { sectionId, courseId } = req.body;
    console.log(sectionId);
    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required feild",
      }); 

    }


    await Section.findByIdAndDelete(sectionId);

    console.log(courseId);

    const deleteSectionFromCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $pull: {
          courseContent: sectionId,
        },
      },
      { new: true }
    );
   
    console.log(deleteSectionFromCourse);

    return res.status(200).json({
      success: true,
      message: "Updating successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in Delete a section",
    });
  }
};
