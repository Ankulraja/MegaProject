const mongoose= require('mongoose');
require("dotenv").config();

const profileSchema = new mongoose.Schema({
gender:{
    type:String,

},
dateOfBirth:{
    type:String,
},
about:{ 
    type:String,
    trim:true,
},
contactNumber:{
    Type:Number,
}
})

module.exports=mongoose.model('Profile',profileSchema);