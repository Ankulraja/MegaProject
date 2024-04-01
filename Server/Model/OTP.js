const mongoose= require('mongoose');
require("dotenv").config();
const MailSender=require('../Utils/MailSender');
const emailVerification= require('../Mail/Template/emailVerificationTemplate copy');

const OtpSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  otp:{
      type:String,
      required:true
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60
  }
})

async function sendVerificationEmail(email,otp){
    try{
         const mailResponse= await MailSender(email,"OTP Verification email",emailVerification(otp))
         console.log("Mail Response: " + mailResponse);
    }catch(err){
        console.log("Error in mailing",err); 
    }
}
OtpSchema.pre("save",async function(next){
await sendVerificationEmail(this.email,this.otp);
next();
})



module.exports=mongoose.model('OTP',OtpSchema);