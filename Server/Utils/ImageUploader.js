const Cloudinary = require("cloudinary").v2;

exports.uploadToCloudinary = async (file, folder, height, quality) => {
  try {
    const options = { folder };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }
    options.resource_type = "auto";
    return await Cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Couldn't upload ",
    });
  }
};
