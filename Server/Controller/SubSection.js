const SubSection = require("../Model/SubSection");
const Section = require("../Model/Section");
const { uploadToCloudinary } = require("../Utils/ImageUploader");
require("dotenv").config();
exports.createSubSection = async (req, res) => {
  try {
    console.log("0.5")
    const { title, description, timeDuration, sectionId } = req.body;
    console.log("0.8")
    const videoUrl  = req.files.videoUrl;
    console.log("1")
    console.log(videoUrl)
    if (!videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required feild",
      });
    }
    console.log("2")

    if (!description || !title || !timeDuration || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required feild",
      });
    }
    console.log("3")

    // Upload Video in cloudinary
    const response = await uploadToCloudinary(
      videoUrl,
      process.env.FOLDER_NAME
    );
    console.log("4")

    // Create a new SubSection
    const createSubSection = await SubSection.create({
      title,
      description,
      timeDuration,
      videoUrl: response.secure_url,
    });
    
    // Add SubSection id in Section
    try{
      const result = await Section.findByIdAndUpdate(
        { _id:sectionId },
        {
          $push: {
            subSection: createSubSection._id,
          },
        },
        { new: true }
      )
        .populate({path:"subSection"})
        .exec();
      
    }catch(e){
      console.log(e)
    }

    console.log("6")
    
    return res.status(200).json({
      success: true,
      createSubSection,
      message: "Subsection created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in creating SubSection",
    });
  }
};

// Update a SubSection
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description, timeDuration } = req.body;
    // if (!subSectionId || !title || !description || !timeDuration) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please enter all required feild",
    //   });
    // }

    console.log(subSectionId, title, description, timeDuration)
    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required feild",
      });
    }
    const response = await SubSection.findById(subSectionId);
    if (title) {
      response.title = title;
    }
    if (description) {
      response.description = description;
    }
    if (timeDuration) {
      response.timeDuration = timeDuration;
    }
    await response.save();

    
    return res.status(200).json({
      success: true,
      message: "Updating SubSection successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in updating SubSection",
    });
  }
};

// Delete a SubSection

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;
    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Feild required",
      });
    }
    console.log("1")
    console.log(sectionId)
    console.log(subSectionId)
    await Section.findByIdAndUpdate(
      { _id:sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      },
      { new: true }
    );
    console.log("2")
    await SubSection.findByIdAndDelete(subSectionId);
    const updatedSection = await Section.findById(sectionId).populate("subSection")
    console.log("3")
    return res.status(200).json({
      success: true,
      updatedSection,
      message: "Deleting SubSection successfully",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in Deleting SubSection",
    });
  }
};
