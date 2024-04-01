const { instance } = require("../Config/razorpay");
const Course = require("../Model/Course");
const User = require("../Model/User");
const MailSender = require("../Utils/MailSender");
const mongoose = require("mongoose");
const mailTemplate = require("../Mail/Template/courseEnrollmentMail");
const {
  courseEnrollmentMail,
} = require("../Mail/Template/courseEnrollmentMail");

// Capture the Payment And Initiate The RazorPay
exports.capturePayment = async (req, res) => {
  try {
    //   get CourseId and UserId
    const { courseId } = req.body;
    const { userId } = req.user.id;
    // Validate
    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "ID'S are Missing",
      });
    }
    //  Valid Course Detail Or not
    try {
      const courseDetail = await Course.findById(courseId);
      // Did User Already there or not
      // Convert UserId(Which is in the form of String can change into ObjectId to perform the Mongoose method , here include is a mongoose method)
      const uid = new mongoose.Type.ObjectId(userId); 
      if (courseDetail.StudentEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "Student already enrolled",
        });
      }
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: "Could Not Find Course Detail",
      });
    }

    // Order Created
    const ammount = courseDetail.price;
    const currency = "INR";
    const option = {
      ammount: ammount * 100,
      currency: currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId,
        userId,
      },
    };
    try {
      //  initiate the Payment
      const paymentResponse = await instance.orders.create(option);
      console.log(paymentResponse);
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Error to connect with RazoPay",
      });
    }
    // return Response
    return res.status(200).json({
      success: true,
      courseName: courseDetail.courseName,
      courseDescription: courseDetail.courseDescription,
      thumbnail: courseDetail.thumbnail,
      orderId: paymentResponse.id,
      ammount: paymentResponse.ammount,
      currency: paymentResponse.currency,
      message: "Payment Captured",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in Payment Server",
    });
  }
};

// Verify The Signature Of RazorPay

exports.verifySignature = async (req, res) => {
  const webhooksecret = "1234567";

  const Signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webhooksecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (Signature === digest) {
    console.log("Payment is Autherized");
    // Fetch From the response of Razorpay
    const { userId, courseId } = req.body.payload.payment.entity.notes;

    try {
      // Fullfill the Action

      // Find The Course and Enrolled in it
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $push: {
            StudentEnrolled: userId,
          },
        },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(400).json({
          success: false,
          message: "Course not found",
        });
      }
      console.log(enrolledCourse);
      //   Find The User and Enrolled in it
      const enrolledUser = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $push: {
            courses: courseId,
          },
        },
        { new: true }
      );
      if (!enrolledUser) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
      console.log(enrolledUser);

      //   Send Mail
      const name = enrolledUser.firstName + " " + enrolledUser.lastName;
      await MailSender(
        enrolledUser.email,
        "Welcome To Our Course", 
        mailTemplate(enrolledCourse.courseName,name)
      );
      return res.status(200).json({
        success: true,
        message: "Course Buy Successfully",
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Error in Course Buy",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Signature Not Match",
    });
  }
};
