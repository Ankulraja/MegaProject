import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import {contactusEndpoint} from "../apis"

const {
  GET_All_USER_DETAILS_API
} = contactusEndpoint;


export async function contactAPI(){
    const toastId = toast.loading("Fetching User Data...")
 try{
    const response = await apiConnector("GET",GET_All_USER_DETAILS_API ,{} )
    console.log("Contact Us Response",response)
    
    toast.dismiss(toastId);
 }catch(e){
   console.log("Error in Sending Contact",e)
 }
}