import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditBtn from "./EditBtn";
import ProfileDetail from "./ProfileDetail";
import {userAllDetail} from "../../../Service/Operation/DashboardApi"
import { useEffect } from "react";

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const callFun =()=>{
    try{
        //  dispatch(userAllDetail())
    }
    catch(e){

    }
  }
  useEffect(()=>{
    callFun();
  },[])
  const { user } = useSelector((state) => state.profile);
  console.log("User In my Profile", user);
//   console.log("User In my Profile", user.additionalDetails);
  return (
    <div className="w-full min-h-screen  pt-16 text-white">
      <div className="w-11/12  mx-auto ">
        <h1 className="text-4xl">My Profile</h1>
        <div className="w-full flex flex-col gap-10 pt-16 ">
          <div className="w-full h-[140px] bg-richblack-800 rounded-lg border-[0.5px] border-richblack-500">
            <div className="w-11/12  relative  h-full mx-auto flex  items-center">
              <div className="w-[80px] h-[80px] rounded-[50%]">
                <img
                  className="rounded-[50%] w-[70px] h-[70px]"
                  src={user.image}
                  alt="loading..."
                ></img>
              </div>
              <div className="pl-5 font-bold text-[18px]">
                <div>{user.firstName + " " + user.lastName}</div>
                <div>{user.email}</div>
              </div>
              <div onClick={()=> navigate("/dashboard/setting")} className="absolute right-10">
                <EditBtn text={"Edit"}></EditBtn>
              </div>
            </div>
          </div>
          <div className="w-full  h-[250px] bg-richblack-800 flex items-center justify-center rounded-lg border-[0.5px] border-richblack-500">
            <div className="w-11/12 relative h-[220px] py-7 mx-auto flex flex-col justify-between items-start">
              <div className="text-xl font-bold">About</div>
              <p className="text-richblack-200">
               {user.additionalDetails.about ? (user?.additionalDetails?.about) : ("Write something about youself")}
              </p>
              <div>
                Account Type :{" "}
                <span className="text-caribbeangreen-400 font-bold">
                  {user.accountType}
                </span>
              </div>
              <div onClick={()=> navigate("/dashboard/setting")} className="absolute right-10 ">
                <EditBtn text={"Edit"}></EditBtn>
              </div>
            </div>
          </div>
          <div className="w-full  h-[340px] bg-richblack-800 flex items-center justify-center rounded-lg border-[0.5px] border-richblack-500">
            <div className="w-11/12 relative h-[310px] py-7 mx-auto flex flex-col  items-start">
              <div className="text-xl font-bold">Personal Details</div>
              <div className="w-full flex flex-col gap-4">
              <div className="w-9/12  mt-14 flex ">       
                 <ProfileDetail text={"First Name"} value={user.firstName}></ProfileDetail>
                 <ProfileDetail text={"Last Name"} value={user.lastName}></ProfileDetail>
              </div>
              <div className="w-9/12  mt-1 flex">       
                 <ProfileDetail text={"Email"} value={user.email}></ProfileDetail>
                 <ProfileDetail text={"Phone Number"} value={`${user.additionalDetails.contactNumber ? (user.additionalDetails.contactNumber ) : ("Add Phone Number")}`}></ProfileDetail>
              </div>
              <div className="w-9/12  mt-1 flex">       
                 <ProfileDetail text={"Gender"} value={`${user.additionalDetails.gender ? (user.additionalDetails.gender ) : ("Add Gender")}`}></ProfileDetail>
                 <ProfileDetail text={"Date Of Birth"} value={`${user.additionalDetails.dateOfBirth ? (user.additionalDetails.dateOfBirth ) : ("Add Date Of Birth")}`}></ProfileDetail>
              </div>
              </div>
              <div className="absolute right-10 " onClick={()=> navigate("/dashboard/setting")}>
                <EditBtn text={"Edit"} link={"/dashboard/setting"}></EditBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
