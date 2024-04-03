import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../Slices/authSlice";
import { resetCart } from "../../Slices/cartSlice";
import { setUser } from "../../Slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { useNavigate } from "react-router-dom";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

// Functions to make async backend calls with data from UI or store and then to update UI or control the navigation after receiving response.
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      console.log("SIGNUP_API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP_API ERROR............", error);
      toast.error("Could Not Sign up user");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successfully");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/")
    toast.success("Logged Out");
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending email...");
    // console.log("Comming to get password reset token", email);
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });
     
      console.log("Response Came of reset password", response);


      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId)
      toast.success(`Email Sent`);
      setEmailSent(true);
    } catch (err) {
      console.log("Reset Password Token Failed");
      console.log("Error: " + err);
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(newPassword, confirmPassword, token,navigate) {
  // console.log("Here",newPassword,confirmPassword)
  const toastId = toast.loading("Loading...")
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        newPassword,
        confirmPassword,
        token,
      });
    
      console.log("Reset Password Response", response);
      if(!response.data.success) {
         throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success(response.data.message);
      navigate("/login")

    } catch (e) {
      console.log("Reset Password Failed");
      console.log("Error: " + e);
    }
  };
}
