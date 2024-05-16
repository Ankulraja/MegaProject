import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";

import {
  setStep,
  setCourse,
  setEditCourse,
} from "../../../../../Slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSection,
  createSection,
} from "../../../../../Service/Operation/Course";
import toast from "react-hot-toast";
import NestedView from "./NestedView";
const CourseBuilder = () => {
  // console.log("CourseBuilder")
  const [editSectionId, setEditSectionId] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    getValue,
    formState: { errors },
  } = useForm();


  const submitHandler = async (data) => {
    const toastId = toast.loading("Loading...");
    console.log("formData", data);
    var result = "";
    if (editSectionId) {
      console.log("Call for Edit");
      result = await updateSection(
        {
          sectionId: editSectionId,
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      console.log("Call for Create");

      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }
    console.log("result...........", result);
    if (result) {
      localStorage.setItem("course",JSON.stringify(result));
      dispatch(setCourse(result));
      setEditSectionId(null);
      setValue("sectionName", "");
    }
    toast.dismiss(toastId);
  };

  const handleChangeEditSection = (sectionId, sectionName) => {
    if(editSectionId === sectionId)
    {
      cancleSection();
      return
    }
    setEditSectionId(sectionId);
    setValue("sectionName", sectionName)
}

  const cancleSection = () => {
    setEditSectionId(null);
    setValue("sectionName", "");
  };


  const gotoBack = () => {
    localStorage.setItem("step",1)
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
    console.log("goto Complete")
  };
  const gotoNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }
    if (
      // Traverse All the Subsection And Check wheather SubSecttion is there or not
      course?.courseContent?.some((section) => section?.subSection?.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    localStorage.setItem("step",3);
    dispatch(setStep(3));
  };


  return (
    <div className="bg-richblack-800 rounded-lg py-5 px-5 border-[0.1px] border-richblack-500">
      <h1 className="text-2xl">Course Builder</h1>
      {/* Nested View */}

      {course?.courseContent?.length > 0 && (
        <div className="mt-10 py-2 px-4 rounded-lg bg-richblack-700">
          {" "}
          <NestedView handleChangeEditSection ={handleChangeEditSection}></NestedView>{" "}
        </div>
      )}

      <form
        onClick={handleSubmit(submitHandler)}
        className="py-4 flex flex-col gap-2"
      >
        {/* Section Input */}
        <div>
          <label className="flex flex-col gap-2">
            <p className="text-richblack-200">
              {course?.courseContent?.length > 0 ? "" : "Section"}
              {course?.courseContent?.length > 0 ? (
                ""
              ) : (
                <sup className="text-pink-200">*</sup>
              )}
            </p>
            <div>
              <input
                type="text"
                name="sectionName"
                placeholder="Add a Section to build your course"
                className="pl-4  w-full outline-none rounded-lg bg-richblack-700 h-10 border-b border-b-richblack-500"
                {...register("sectionName", { required: true })}
              ></input>
              {errors.sectionName && (
                <div className="text-pink-400 text-[14px]">
                  Enter The Section Name
                </div>
              )}
            </div>
          </label>
        </div>

        {/* Create Section Button */}

        <div className="flex items-center gap-7">
          <button
            type="submit"
            className="border my-5 w-fit gap-2 border-yellow-100 rounded-lg text-yellow-100 flex items-center py-3 px-4"
          >
            <span className="text-yellow-100">
              <IoAddCircleOutline ></IoAddCircleOutline>
            </span>

            {editSectionId ? "Edit Section" : "Create Section"}
          </button>
          {editSectionId && (
            <button
              onClick={cancleSection}
              className="text-pure-greys-400 underline"
            >
              Cancle Edit
            </button>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-5">
          <button
            onClick={gotoBack}
            className="flex items-center gap-2 w-fit mt-10 px-3 rounded-lg bg-richblack-500 text-black font-bold"
          >
            {" "}
            <GoArrowLeft></GoArrowLeft>
            <p>Back</p>
          </button>
          <button
            type="submit"
            onClick={gotoNext}
            className="flex items-center gap-2 py-2 w-fit mt-10 px-3 rounded-lg bg-yellow-100 text-black font-bold"
          >
            Next <MdArrowRightAlt></MdArrowRightAlt>
          </button>
        </div>
      </form>
    </div>
  );
};
export default CourseBuilder;
