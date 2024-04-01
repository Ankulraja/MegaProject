
const express= require('express');
const router = express.Router() 

const {capturePayment,verifySignature}=require('../Controller/Payment');
const {
    auth,
    isStudent,
    isAdmin,
    isInstructor,
  } = require("../Middleware/Auth");

router.post("/capturePayment",auth,isStudent,capturePayment)
router.post("/verifySignature",auth,isStudent,verifySignature)



module.exports = router;
