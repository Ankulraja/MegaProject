import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import {profileEndpoints} from "../apis"
import { setUser } from "../../Slices/profileSlice";
const {
    GET_All_USER_DETAILS_API
} = profileEndpoints;


export async function userAllDetail(){
    // const toastId = toast.loading("Sending...")
 try{

    const response = await apiConnector("GET",GET_All_USER_DETAILS_API,{name:"Ankul"} )
    console.log("Contact Us Response",response)
    // console.log("Contact Us Response",response.data)
    // setUser(response.data);
    console.log("Calling")

    // toast.dismiss(toastId);
 }catch(e){
   console.log("Error in Sending Contact",e)
 }
}