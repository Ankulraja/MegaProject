import { apiConnector } from "../apiConnector";
import {profileEndpoints} from "../apis"
 
const {
    GET_USER_ENROLLED_COURSES_API
} = profileEndpoints;

export function getEnrolledCourse(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("PUT",GET_USER_ENROLLED_COURSES_API,"",{
        "Content-Type": "multipart/form-data",
        Authorization : `Bearer ${token}`
      });
      console.log("response.........", response?.data);
    } catch (e) {
      console.log("Error........", e);
    }
  };
}
