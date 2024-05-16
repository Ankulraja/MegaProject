const Cloudinary = require("cloudinary").v2;

exports.uploadToCloudinary = async (file, folder, height, quality) => {
  try {
    console.log("Cloudinary upload 1")
    const options = { folder };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }
    console.log("Cloudinary upload 2")

    options.resource_type = "auto";
    
    console.log("Cloudinary upload 3")

    return await Cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (err) {
    console.error("Error uploading file to Cloudinary:", err);
    throw err;
  }
};
