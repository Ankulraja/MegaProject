import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Btnyellow from "./Btnyellow";
import Btngray from "./Btngray";
import { updateProfile } from "../../../../Service/Operation/Setting";

const ProfileInfo = () => {
  const { user } = useSelector((state) => state.profile);
  // console.log("user..............",user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state)=> state.auth);
  const [formData, setFormData] = useState({
    firstName: `${user.firstName}`,
    lastName: `${user.lastName}`,
    dateOfBirth: `${
      user.additionalDetails.dateOfBirth
        ? user.additionalDetails.dateOfBirth
        : ""
    }`,
    gender: `${user.additionalDetails.gender}`,
    contactNumber: `${
      user?.additionalDetails?.contactNumber
        ? user.additionalDetails.contactNumber
        : ""
    }`,
    about: `${
      user?.additionalDetails.about ? user.additionalDetails.about : ""
    }`,
  });

  const changeHandler = (event) => {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("Form data submitted", formData);
    await dispatch(updateProfile(token,formData))
    window.location.reload();
  };

  return (
    <div className="w-11/12 mx-auto py-7">
      <h1 className="font-bold text-[20px]">Profile Information</h1>
      <form onSubmit={submitHandler} className="relative">
        <div className="pt-5 flex flex-col gap-5">
          <div className="w-full flex">
            <div className="w-1/2 flex flex-col gap-2 ">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={changeHandler}
                value={formData.firstName}
                className="bg-richblack-700 h-10 rounded-lg mr-5 px-4"
              ></input>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={changeHandler}
                value={formData.lastName}
                className="bg-richblack-700 h-10 rounded-lg mr-5 px-4"
              ></input>
            </div>
          </div>

          {/* 2nd  */}
          <div className="w-full flex">
            <div className="w-1/2 flex flex-col gap-2 ">
              <label htmlFor="DOB">Date Of Birth</label>
              <input
                type="date"
                id="DOB"
                name="dateOfBirth"
                onChange={changeHandler}
                value={formData.dateOfBirth}
                className="bg-richblack-700 h-10 rounded-lg mr-5 px-4"
              ></input>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <label htmlFor="firstName">Gender</label>
              <select
                onChange={changeHandler}
                name="gender"
                required
                value={formData.gender}
                className="bg-richblack-700 h-10 rounded-lg mr-5 px-4"
              >
                <option value="" disabled selected hidden>
                  Choose Your Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="None">Prefer Not to Say</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          {/* 3rd */}
          <div className="w-full flex">
            <div className="w-1/2 flex flex-col gap-2 ">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="number"
                id="contactNumber"
                name="contactNumber"
                min={1111111111}
                max={9999999999}
                required
                value={formData.contactNumber}
                onChange={changeHandler}
                placeholder="Enter your contact number"
                className="bg-richblack-700 h-10 rounded-lg mr-5 px-4"
              ></input>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <label htmlFor="about">About</label>
              <input
                type="text"
                id="about"
                name="about"
                onChange={changeHandler}
                placeholder="Enter Bio Detail"
                value={formData.about}
                className="bg-richblack-700 h-10 rounded-lg mr-5 px-4"
              ></input>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
          className=" absolute right-11 -bottom-28"
        >
          <Btngray text={"Cancle"}></Btngray>
        </div>
        <button type="submit" className=" absolute -right-10 -bottom-28">
          <Btnyellow text={"Save"}></Btnyellow>
        </button>
      </form>
    </div>
  );
};
export default ProfileInfo;
