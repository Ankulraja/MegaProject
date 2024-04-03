import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetPassword } from "../Service/Operation/authAPI";
function UpdatePassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNewPass, setNewPass] = useState(false);
  const [showCnfPass, setCnfPass] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const changeHandler = (event) => {
    setFormData((old) => {
      return {
        ...old,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formData.newPassword !== formData.confirmPassword) {
      toast.error("Password Not Match")
      return;
    }
    console.log(formData)
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(formData.newPassword, formData.confirmPassword,token,navigate))

  }
  return (
    <div className="bg-richblack-900 w-screen h-screen text-white flex justify-center items-center">
      <div className="w-3/12 ">
        <h1 className="font-bold text-2xl my-3">Choose Your New PassWord</h1>
        <p className="my-3 text-richblack-200">Almost done. Enter your new password and youre all set.</p>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col  ">
            <label htmlFor="xyz" className="text-richblack-100">
              New PassWord <sup className="text-pink-500 ">*</sup>
            </label>
            <div className="flex relative">
              <input
                type={`${showNewPass ? "text" : "password"}`}
                name="newPassword"
                required
                onChange={changeHandler}
                value={formData.newPassword}
                className="bg-richblack-800 mb-5 w-full my-1 h-10 rounded-lg border-b border-b-richblack-500 px-3"
                placeholder="************"
                id="xyz"
              ></input>
              <span
                onClick={() => {
                  setNewPass(!showNewPass);
                }}
                className="absolute z-10 bottom-[30%] right-3 text-xl text-white hover:cursor-pointer ml-[10px]"
              >
                {!showNewPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <label htmlFor="xyz">
              Confirm PassWord <sup className="text-pink-500">*</sup>
            </label>
            <div className="flex relative">
              <input
                type={`${showCnfPass ? "text" : "password"}`}
                name="confirmPassword"
                required
                onChange={changeHandler}
                value={formData.confirmPassword}
                className="bg-richblack-800 w-full my-1 h-10 rounded-lg border-b border-b-richblack-500 px-3"
                placeholder="************"
                id="xyz"
              ></input>
              <span
                onClick={() => {
                  setCnfPass(!showCnfPass);
                }}
                className="absolute z-10 bottom-[30%] right-3 text-xl text-white hover:cursor-pointer ml-[10px]"
              >
                {!showCnfPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="text mt-5 center w-full py-2 my-2 text-black font-semibold rounded-lg bg-yellow-100">
              Reset Password
            </button>
        </form>
        <button>
          {" "}
          <Link
            className="flex mt-5 flex-row gap-2 items-center justify-center text-richblack-100 "
            to="/login"
          >
            <FaArrowLeftLong></FaArrowLeftLong> Back to login
          </Link>
        </button>
      </div>
    </div>
  );
}
export default UpdatePassword;
