import {toast} from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import {logout} from "./authAPI"


const { DELETE_PROFILE_API,UPDATE_DISPLAY_PICTURE_API } = settingsEndpoints;



export function updateProfile(token,img) {
  return async function(dispatch) {
        console.log("Image",img)
        console.log("Image",img[0])
     try{
          const response = await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,img[0],{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          })

          console.log("Getting Response after updating profile",response);
          
     }catch(e){
      console.log("Error While Deleting the Profile",e)
     }
  }
  
}







export function deleteAccount(token,navigate) {
  return async function(dispatch) {
    try {
      const toastId = toast.loading("Deleting.....")
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("Response getting after delete Account",response);
      toast.success("Account deleted Successfully");

      dispatch(logout(navigate))
      toast.dismiss(toastId);
    } catch (e) {
      console.log("Error in deleting profile",e)
    }
  }
  
}
