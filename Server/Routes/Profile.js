const express= require('express');
const router = express.Router() 

const {capturePayment,verifySignature}=require('../Controller/Payment');
const {
    auth,
    isStudent,
    isAdmin,
    isInstructor,
  } = require("../Middleware/Auth");

const{updateProfile,deleteAccount,getAllUserDetails,updateProfilePhoto}=require("../Controller/Profile");
const {resetPasswordToken,resetPassword}=require("../Controller/ResetPassword")

router.post("/resetPasswordToken",resetPasswordToken)
router.post("/resetPassword",resetPassword)

router.put("/updateProfile",auth,isStudent,updateProfile);
router.delete("/deleteAccount",auth,deleteAccount)
router.get("/getAllUserDetails",auth,getAllUserDetails);
router.put("/updateProfilePhoto",auth,updateProfilePhoto);




module.exports = router;