import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../Service/Operation/authAPI";
const ForgetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const {loading} = useSelector((state)=> state.auth)
  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("email...",email)
    dispatch(getPasswordResetToken(email,setEmailSent))
   
  }
  return (
    <div className="bg-richblack-900 text-white w-screen min-h-screen flex justify-center items-center ">
      <div className="w-3/12 ">
        <h1 className="my-3 font-bold text-xl text-richblack-25">
          {" "}
          {!emailSent ? "Reset Your Password" : "Check Email"}
        </h1>
        <p className="my-3 text-richblack-200 text-[14px]">
          {" "}
          {!emailSent ? (
            "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
          ) : (
            <div>
              We have sent the reset email to{" "}
              <span className="text-caribbeangreen-100">{email}</span>
            </div>
          )}
        </p>
        <form className="my-5" onSubmit={submitHandler}>
          {!emailSent ? (
            <div className="flex flex-col">
              <label htmlFor="abc">Email Address </label>
              <input
                typeof="email"
                name="email"
                required
                value={email}
                onChange={(event)=>setEmail(event.target.value)}
                className="bg-richblack-800 my-1 h-10 rounded-lg border-b border-b-richblack-500 px-3"
                placeholder="abcd1234@gmail.com"
                id="abc"
                type="email"
              ></input>
            </div>
          ) : (
            <div></div>
          )}
          {!emailSent ? (
            <button type="submit" className="text center w-full py-2 my-2 text-black font-semibold rounded-lg bg-yellow-100">
              Reset Password
            </button>
          ) : (
            <button type="submit"  className="text center w-full py-2 my-2 text-black font-semibold rounded-lg bg-yellow-100">
              Resend Email
            </button>
          )}
        </form>

        <button>
          {" "}
          <Link
            className="flex flex-row gap-2 items-center justify-center text-richblack-100 "
            to="/login"
          >
            <FaArrowLeftLong></FaArrowLeftLong> Back to login
          </Link>
        </button>
      </div>
    </div>
  );
};
export default ForgetPassword;
