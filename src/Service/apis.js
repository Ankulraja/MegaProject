const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories ={
    CATEGORIES_API:BASE_URL + "/course/showAllCategory"
}


// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/OtpGenerator",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  }


// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
  }


// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_All_USER_DETAILS_API: BASE_URL + "/profile/getAllUserDetails",
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

