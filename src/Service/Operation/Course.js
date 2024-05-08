import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"





const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
  } = courseEndpoints



export const fetchCourseCategories = async () => {
    let result = []
    console.log("Yaha Aaya")
    try {
      // console.log("Fetching courses Categories .....")
      const response = await apiConnector("GET", COURSE_CATEGORIES_API)
      // console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
      // console.log("COURSE_CATEGORIES_API API RESPONSE............22 ", response?.data.allCategory)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories")
      }
      result = response?.data.allCategory
      return result;
    } catch (error) {
      console.log("COURSE_CATEGORY_API API ERROR............", error)
      toast.error(error.message)
    }
    return result
  }