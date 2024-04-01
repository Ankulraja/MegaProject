const mongoose= require('mongoose');
require("dotenv").config();

const courseSchema = new mongoose.Schema({

courseName:{
    type:String,
    require:true,
    trim:true
},
courseDescription:{
    type:String,
    require:true,
    trim:true
},
instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
whatYouWillLearn:{
    type:String,
},
courseContent:[{
     type:mongoose.Schema.Types.ObjectId,
     ref:'Section',
}],
ratingAndReview:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'RatingAndReview',
}],
price:{
    type:Number,
    required:true,
    trim:true,
},
thumbnail:{
    type:String,
    required:true,
},
tags:{
    type:[String],
},
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category"
},
StudentEnrolled:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"User"
}, 
instructions:{
    type:[String]
},
status:{
    type:String,
    enum:["Draft","Published"]
}

})

module.exports=mongoose.model('Course',courseSchema);