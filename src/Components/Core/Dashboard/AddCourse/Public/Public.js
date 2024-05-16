import { MdArrowRightAlt } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setStep } from "../../../../../Slices/courseSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editCourseDetail } from "../../../../../Service/Operation/Course";

const Public = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm(); // Invoke the useForm hook
  const {course }= useSelector((state)=>state.course)
  const {token} = useSelector((state)=>state.auth)
  const navigate =useNavigate();
  const [publishing, setPublishing] = useState(false);
  useEffect(() => {
    if(course?.status === "Published"){
      setValue("publish", true)
    }
  }, [])
  

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async ()=> {
    if(
      (course?.status === "Published" && getValues("publish") === true) ||
      (course?.status === "Draft" && getValues("public")===false) 
    ){
      goToCourses();
      return
    }
    
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("publish")
      ? "Published"
      : "Draft"
    formData.append("status", courseStatus)
   
    const result = await editCourseDetail(formData, token)
    if (result) {
      goToCourses()
    }
  }

  const onSubmit = (data) => {
    handleCoursePublish()
  }

  return (
    <div className="">
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start  gap-4 py-5 text-richblack-300">
        <div className="py-10 px-5 flex flex-col gap-6 bg-richblack-800 rounded-lg border border-richblack-700">
        <h2 className=" text-2xl tracking-wider">Publish Settings</h2>
        <div className="flex gap-4 justify-start items-center">
        <input
          className="border-gray-300 h-5 w-5 rounded-lg bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
          id="check"
          type="checkbox"
          {...register("publish")}
          onChange={(e) => setPublishing(e.target.checked)}
        ></input>
        <label htmlFor="check" className="tracking-wider">
          Make This Course Public
        </label>
        </div>
        </div>
        <div className="mt-20 flex justify-between items-center tracking-wider">
          <button
           type="button"
            onClick={() => {
              localStorage.setItem("step", 2);
              dispatch(setStep(2));
            }}
            className="py-3 flex justify-center items-center gap-3 px-5 shadow-sm shadow-richblack-200 rounded-lg bg-richblack-800 "
          >
            <span className="text-richblack-25">
              <GoArrowLeft></GoArrowLeft>
            </span>{" "}
            Back
          </button>
          <div className="flex items-center gap-5">
            {/* <button className="py-3 flex justify-center items-center gap-3 px-5 shadow-sm shadow-richblack-200 rounded-lg bg-richblack-800 ">
              Save as a Draft
            </button> */}
            <button type="submit" className="py-3 flex justify-center items-center gap-3 px-5 shadow-sm shadow-richblack-200 rounded-lg bg-yellow-100 text-black">
             {publishing ? "Save and Publish" : "Save and Draft"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Public;
