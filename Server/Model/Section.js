const mongoose = require("mongoose");
require("dotenv").config();

const SectionSchema = new mongoose.Schema({
  sectionName:{
    type:String,
  },
  subSection:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubSection"
  }]


});

module.exports= mongoose.model("Section", SectionSchema);
