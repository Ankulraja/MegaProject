import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Btnyellow from "./Btnyellow";
import Btngray from "./Btngray";
import { updatePassword } from "../../../../Service/Operation/Setting";

const PasswordInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth)
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  function changeHandler(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  const submitHandler =(event)=>{
      event.preventDefault();
      console.log("Form submit ",formData)
      dispatch(updatePassword(token, formData));
  }
  return (
    <div className="w-11/12 mx-auto py-8">
      <h1 className="text-[20px] font-bold">Password</h1>
      <div className="w-full">
        <form className="flex gap-4 relative" onSubmit={submitHandler}>
          <div className="w-1/2">
            <label htmlFor="currentPassword" className="relative w-full ">
              <p className="my-[10px]">Current Password</p>
              <input
                type={showPassword1 ? "text" : "password"}
                required
                id="currentPassword"
                value={formData.currentPassword}
                placeholder="Enter Current password"
                onChange={changeHandler}
                name="currentPassword"
                className="bg-richblack-700 rounded-[0.5rem] text-gray-50 p-[12px] w-full h-10 border-b border-b-richblack-200"
              ></input>
              <span
                onClick={() => setShowPassword1(!showPassword1)}
                className="absolute bottom-0 right-3 text-richblack-200  text-xl  hover:cursor-pointer ml-[10px]"
              >
                {showPassword1 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </label>
          </div>

          {/* 2nd form */}

          <div className="w-1/2">
            <label htmlFor="newPassword" className="relative w-full ">
              <p className="my-[10px]">New Password</p>
              <input
                type={showPassword2 ? "text" : "password"}
                required
                id="newPassword"
                value={formData.newPassword}
                placeholder="Enter New password"
                onChange={changeHandler}
                name="newPassword"
                className="bg-richblack-700 rounded-[0.5rem] text-gray-50 p-[12px] w-full h-10 border-b border-b-richblack-200"
              ></input>
              <span
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute bottom-0 right-3 text-richblack-200  text-xl hover:cursor-pointer ml-[10px]"
              >
                {showPassword2 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </label>
            <div
              onClick={() => {
                navigate("/dashboard/my-profile");
              }}
              className=" absolute right-16 -bottom-28"
            >
              <Btngray text={"Cancle"}></Btngray>
            </div>
            <button type="submit" className=" absolute -right-10 -bottom-28">
              <Btnyellow text={"Update"}></Btnyellow>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PasswordInfo;
