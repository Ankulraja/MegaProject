import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { logout } from "./authAPI";
import { setUser } from "../../Slices/profileSlice";

const {
  DELETE_PROFILE_API,
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  UPDATE_PASSWORD_API,
} = settingsEndpoints;

export function updateProfile(token, formData) {
  return async (dispatch) => {
    try {
      console.log("Comming...");
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
      // console.log("Response of Update Profile", response);
      // console.log("Response of Update Profile", response?.data);
      // console.log("Response of Update Profile", response?.data.user);
      dispatch(setUser(response?.data.user));
      localStorage.setItem("user", JSON.stringify(response?.data.user));
    } catch (err) {
      console.log("error..........", err);
    }
  };
}

export function updateProfilePicture(token, formdata) {
  return async function (dispatch) {
    // console.log("Image",img)
    console.log("Image", formdata);

    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formdata,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      // console.log("Getting Response after updating profile", response);
      dispatch(setUser(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (e) {
      console.log("Error While Deleting the Profile", e);
    }
  };
}

export function updatePassword(token, formData) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("PUT", UPDATE_PASSWORD_API, formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      );
      console.log("Response...while updating password", response?.data);
      toast.success(response?.data.message);
    } catch (e) {
      console.log("Error while updating the password", e);
      toast.error(e.response.data.message);
    }
  };
}

export function deleteAccount(token, navigate) {
  return async function (dispatch) {
    try {
      const toastId = toast.loading("Deleting.....");
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("Response getting after delete Account", response);
      toast.success("Account deleted Successfully");

      dispatch(logout(navigate));
      toast.dismiss(toastId);
    } catch (e) {
      console.log("Error in deleting profile", e);
    }
  };
}
