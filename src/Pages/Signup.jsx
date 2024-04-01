import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
// import youtube from "../images/youtube.png"

export const Signup = ({ setISLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [accountType, setAccountType] = useState("YouTuber");

  function changeHandler(event) {
    setFormdata((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password do not match");
      return;
    }
    const acodata = {
      ...formData,
    };
    const finaldata = {
      ...acodata,
      accountType,
    };
  }

  return (
    <div className="w-screen min-h-screen  bg-richblack-900">
      <div className="w-11/12 min-h-screen mx-auto flex flex-row justify-center items-center max-lg:flex-col-reverse">
        <div className="flex pb-10 flex-col w-1/2 justify-center text-white">
          <div className="w-[500px]">
            <h1 className="text-3xl font-bold">
              {" "}
              Join the millions learning to code with StudyNotion for free
            </h1>
            <p className="my-5">
              Build skills for today, tomorrow, and beyond.
              <span className="text-caribbeangreen-400">
                {" "}
                Education to future-proof your career.
              </span>
            </p>
          </div>
          <div
            className="w-[200px] flex flex-row justify-center rounded-full
             bg-richblack-800 text-richblack-200 px-2 my-5 py-1  shadow-[0.5px_0.5px_0px_0px_rgba(128,128,128)]"
          >
            <div
              className={`${
                accountType === "YouTuber"
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-200"
              }
                w-1/2 text-center py-2 px-5 rounded-full transitiion-all duration-200`}
            >
              <button
                onClick={() => {
                  setAccountType("YouTuber");
                }}
              >
                Student
              </button>
            </div>
            <div
              className={`${
                accountType === "Editor"
                  ? "bg-black text-white "
                  : "bg-transparent text-gray-200"
              } 
            py-2 px-5 text-center w-1/2 rounded-full transitiion-all duration-200`}
            >
              <button
                onClick={() => {
                  setAccountType("Editor");
                }}
              >
                Instructor
              </button>
            </div>
          </div>
          <form onSubmit={submitHandler} className="w-[500px] text-white">
            <div className="flex justify-between gap-2 ">
              <label className="w-full flex flex-col items-start relative mt-1">
                <p className="text-[0.875rem] text-gray-50 mb-1 leading-[1.375rem] ml-2">
                  First Name<sup className="text-pink-500">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="firstName"
                  onChange={changeHandler}
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  className="bg-richblack-800 rounded-[0.5rem] text-gray-50 p-[12px] w-full h-10 border-b border-b-richblack-200"
                />
              </label>

              <label className="w-full flex flex-col items-start relative mt-1">
                <p className="text-[0.875rem] text-gray-50 mb-1 leading-[1.375rem] ml-2">
                  Last Name<sup className="text-pink-500">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="lastName"
                  onChange={changeHandler}
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  className="bg-richblack-800  rounded-[0.5rem] text-gray-50 p-[12px] w-full h-10 border-b border-b-richblack-200"
                />
              </label>
            </div>
            {/* email  */}
            <label className=" flex flex-col items-start relative mt-2">
              <p className="text-[0.875rem] text-gray-50 mb-1 leading-[1.375rem] ml-2">
                Email Address<sup className="text-pink-500">*</sup>
              </p>
              <input
                required
                type="email"
                name="email"
                onChange={changeHandler}
                placeholder="Enter Email Address"
                value={formData.email}
                className="bg-richblack-800  rounded-[0.5rem] text-gray-50 p-[12px] w-full h-10 border-b-2 border-b-richblack-200"
              />
            </label>
            {/* create password  */}
            <div className=" flex justify-between gap-2">
              <label className="w-full flex flex-col items-start relative mt-2">
                <p className="text-[0.875rem] text-gray-50 mb-1 leading-[1.375rem] ml-2">
                  Create Password<sup className="text-pink-500">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={changeHandler}
                  placeholder="Enter Password"
                  value={formData.password}
                  className="bg-richblack-800  rounded-[0.5rem] text-gray-50 p-[12px] w-full h-10 border-b-2 border-b-richblack-200"
                />
                <span
                  className="absolute right-3 top-[30px] cursor-pointer mt-1"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </label>

              <label className="w-full flex flex-col items-start relative mt-2">
                <p className="text-[0.875rem] text-gray-50 mb-1 leading-[1.375rem] ml-2">
                  Confirm Password<sup className="text-pink-500">*</sup>
                </p>
                <input
                  required
                  type={showPassword1 ? "text" : "password"}
                  name="confirmPassword"
                  onChange={changeHandler}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  className="bg-richblack-800  rounded-[0.5rem] text-gray-50 p-[12px] w-full h-10 border-b-2 border-b-richblack-200"
                />

                <span
                  className="absolute right-3 top-[30px] cursor-pointer mt-1"
                  onClick={() => setShowPassword1((prev) => !prev)}
                >
                  {showPassword1 ? (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </label>
            </div>

            <button className="bg-yellow-100 text-black font-bold mt-5 w-full rounded-[8px]  text-gray-800 px-[10px] py-[10px] border-2 border-gray-950  hover:text-white duration-200">
              Create Account
            </button>
            <div className="flex w-full items-center my-4 gap-x-2">
              <div className="w-full h-[1px] bg-gray-700"></div>
              <p className="text-gray-700 font-medium leading-[1.375rem]">OR</p>
              <div className="w-full h-[1px] bg-gray-700"></div>
            </div>
            <button
              className=" w-full flex justify-center items-center 
            rounded-[8px] font-medium text-gray-100 border
             border-gray-700 px-[12px] py-[8px] gap-x-2 mt-4 hover:bg-gray-900 transition-all duration-100 "
            >
              <FcGoogle />
              <p>Sign Up with Google</p>
            </button>
          </form>
        </div>
        <div className="w-1/2 relative flex justify-center my-20 ">
          <div className="w-[480px] relative">
            <div className="w-full z-30 relative">
              <img
                className=""
                src="https://studynotion.tech/static/media/signup.acaf50bcb11d9aec44b4.webp"
                alt="youtube"
              ></img>
            </div>
            <img
              className="absolute w-full  left-[5%] top-[5%]"
              src="https://res.cloudinary.com/dkoezhi9u/image/upload/v1711576419/UploadOnly/download_moc7dv.png"
              alt="youtube"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
