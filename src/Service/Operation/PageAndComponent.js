import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import {contactusEndpoint} from "../apis"

const {
    CONTACT_US_API
} = contactusEndpoint;


export async function contactAPI(){
    const toastId = toast.loading("Sending...")
 try{
    const response = await apiConnector("POST",CONTACT_US_API ,{} )
    console.log("Contact Us Response",response)
    toast.dismiss(toastId);
 }catch(e){
   console.log("Error in Sending Contact",e)
 }
}