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
    // console.log("Yaha Aaya")
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


export const addCourseDetail = async (data,token)=>{
    // console.log("AddCourse me Aaya   .........///....",data)

  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }
    toast.success("Course Details Added Successfully")
    result = response?.data?.newCourse
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export const editCourseDetail = async (data,token)=>{
  console.log("EditCourse me Aaya",data)
  for (const entry of data.entries()) {
    console.log(" Entry ",entry);
  }

  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    result = response?.data?.data

    toast.success("Course Details Updated Successfully")
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}



export const createSection = async (data, token) => {
  let result = null
  // const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.updatedCourse
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  // toast.dismiss(toastId)
  return result
}


export const updateSection = async (data, token) => {
  let result = null
  // const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.updatedCourse
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  // toast.dismiss(toastId)
  return result
}

export const deleteSection = async (data, token) => {
  let result = null
  // const toastId = toast.loading("Loading...")
  // console.log("deleting Data",data)
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.updatedCourse
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  // toast.dismiss(toastId)
  return result
}

export const createSubSection = async (data, token) => {
  let result = null
  // const formData={
  //   title:data.title ,
  //    description:data.description, 
  //    sectionId:data.sectionId,
  //    videoUrl:data.video
  // }
  const formData = new FormData()
  formData.append("title",data.get("title"))
  formData.append("description",data.get("description"))
  formData.append("sectionId",data.get("sectionId"))
  formData.append("videoUrl",data.get("video"))
  // console.log("........",data.get("video"))
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    console.log("Updated RESPONSE............", response?.data?.updatedSection);
    result = response?.data?.updatedSection
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const updateSubSection = async (data, token) => {
  let result = null
  
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.updatedSection
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export const fetchInstructorCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("INSTRUCTOR COURSES API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}