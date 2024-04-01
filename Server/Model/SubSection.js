const mongoose = require("mongoose");
require("dotenv").config();

const SubSectionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  timeDuration: {
    type: String,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  // additionalUrl: {
  //   type: String,
  // },
});

module.exports= mongoose.model("SubSection", SubSectionSchema);
