import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetail,
  editCourseDetail,
  fetchCourseCategories,
} from "../../../../../Service/Operation/Course";
import { LiaRupeeSignSolid } from "react-icons/lia";
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import RequirementFeild from "./RequirementFeild";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../Slices/courseSlice";
import { current } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const CourserInformation = () => {
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [courseCategories, setCourseCategories] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { step } = useSelector((state) => state.course);
  const {
    register,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getCategories = async () => {
      const getCategoriesData = await fetchCourseCategories();
      // console.log("....................getCategories",getCategoriesData)

      setCourseCategories(getCategoriesData);
    };
    // console.log("Before EditCourse", course);
    if (editCourse) {
      // console.log("data populated", editCourse);
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tags);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    // console.log("After EditCourse", setValue);
    getCategories();
  }, []);

  const isFormUpdate = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tags.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
      course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {

      // console.log(currentValues.courseTitle !== course.courseName)
      // console.log(currentValues.courseShortDesc !== course.courseDescription )
      // console.log(currentValues.coursePrice !== course.price)
      // console.log(currentValues.courseTags.toString() !== course.tags.toString() )
      // console.log(currentValues.courseBenefits !== course.whatYouWillLearn )
      // console.log(currentValues.courseCategory._id !== course.category._id )
      // console.log(currentValues.courseRequirements.toString() !==
      // course.instructions.toString())
      // console.log(currentValues.courseImage !== course.thumbnail)
      // console.log(course)
      // console.log(currentValues.courseBenefits)
      // console.log(course.whatYouWillLearn)
      return true;
    } else return false;
  };
  const submitForm = async (data) => {
    if (editCourse) {
      // console.log("Edit me aaya");
      if (isFormUpdate()) {
      console.log("Edit Form Change Hua");
        const formData = new FormData();
        const currentValues = getValues();
        console.log("Course Id............",course._id);
        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tags.toString()) {
          formData.append("tags", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnail", data.courseImage);
        }

        const result = await editCourseDetail(formData, token);
        if (result) {
          localStorage.setItem("step", 2);
          dispatch(setStep(2));
          console.log("After Edit Course .....", result);
          localStorage.setItem("course", JSON.stringify(result));
          dispatch(setCourse(result));
          dispatch(setEditCourse(false));
        }
      } else {
        toast.error("No Changes is there !! ");

        return;
      }
    } else {
      // You Are New One And Create A Course
      const formData = new FormData();
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      formData.append("tags", JSON.stringify(data.courseTags));
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("category", data.courseCategory);
      formData.append("status", "Draft")
      formData.append("instructions", JSON.stringify(data.courseRequirements));
      formData.append("thumbnail", data.courseImage);

      console.log(
        "Add Course Ko Call Kiya Hai....",
        formData.get("instructions")
      );

      const result = await addCourseDetail(formData, token);
      console.log("Add Course se Result Aaay hai", result);
      const toastId = toast.loading("Adding Data...");

      if (result) {
        console.log("Course Set Hua");
        localStorage.setItem("step", 2);
        dispatch(setStep(2));
        localStorage.setItem("course", JSON.stringify(result));
        dispatch(setCourse(result));
        console.log("Aage Step Jao", step);
      }
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="border-[0.5px] border-richblack-500 rounded-lg px-5 py-7 bg-richblack-800">
      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-7">
        <label className="w-full flex flex-col gap-2">
          <p className="text-[14px] text-richblack-200">
            Course Title <sup className=" text-pink-400">*</sup>
          </p>
          <div className="w-full">
            <input
              placeholder="Enter Course Name"
              type="text"
              name="courseTitle"
              className="px-4 w-full outline-none rounded-lg bg-richblack-700 h-10 border-b border-b-richblack-500"
              {...register("courseTitle", { required: true })}
            ></input>
            {errors.courseTitle && (
              <div className="text-[12px] text-pink-200">Enter Course Name</div>
            )}
          </div>
        </label>

        {/* Description */}

        <label className="flex flex-col gap-2">
          <p className="text-[14px] text-richblack-200">
            Course Short Description <sup className=" text-pink-400">*</sup>
          </p>
          <div>
            <textarea
              placeholder="Enter Description"
              type="text"
              name="courseShortDesc"
              rows={5}
              className="px-4 w-full py-2 outline-none rounded-lg bg-richblack-700 border-b border-b-richblack-500"
              {...register("courseShortDesc", { required: true })}
            ></textarea>

            {errors.courseShortDesc && (
              <div className="text-[12px] text-pink-200">
                Enter Course Description Name
              </div>
            )}
          </div>{" "}
        </label>

        {/* Price */}
        <label className="flex flex-col gap-2">
          <p className="text-[14px] text-richblack-200">
            Price <sup className=" text-pink-400">*</sup>
          </p>
          <div className="w-full relative">
            <div className="absolute top-[50%] -translate-y-[50%] left-[2%] ">
              <LiaRupeeSignSolid></LiaRupeeSignSolid>
            </div>
            <input
              placeholder="Price"
              type="number"
              name="coursePrice"
              className="pl-9  w-full outline-none rounded-lg bg-richblack-700 h-10 border-b border-b-richblack-500"
              {...register("coursePrice", {
                required: true,
                valueAsNumber: true,
              })}
            ></input>
            {errors.coursePrice && (
              <div className="text-[12px] text-pink-200">Enter Number Only</div>
            )}
          </div>
        </label>

        {/* Category */}

        <label className="flex flex-col gap-2">
          <p className="text-[14px] text-richblack-200">
            Category <sup className=" text-pink-400">*</sup>
          </p>
          <div>
            <select
              defaultValue=""
              name="courseCategory"
              className="px-5 w-full outline-none rounded-lg bg-richblack-700 h-10 border-b border-b-richblack-500"
              {...register("courseCategory", { required: true })}
            >
              <option value="" disabled>
                Choose Category
              </option>
              {courseCategories?.map((val, index) => (
                <option key={index} value={val._id}>
                  {val.name}
                </option>
              ))}
            </select>
            {errors.coursePrice && (
              <div className="text-[12px] text-pink-200">
                Choose Course Category
              </div>
            )}
          </div>
        </label>

        {/* Tags */}

        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter Tags and Press Enter"
          register={register}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
        ></ChipInput>

        {/* Upload Thumbnail */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        {/* Benifits */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
            Benefits of the course <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseBenefits"
            placeholder="Enter benefits of the course"
            {...register("courseBenefits", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full"
          />
          {errors.courseBenefits && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Benefits of the course is required
            </span>
          )}
        </div>

        {/* Requirement */}
        <RequirementFeild
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
        ></RequirementFeild>

        <div className="flex justify-end gap-8 ">
          {editCourse && (
            <button
              type="button"
              className="py-3 px-5 rounded-lg bg-richblack-700 text-richblack-100"
              onClick={() => {
                localStorage.setItem("step", 2);
                dispatch(setStep(2))
              }}
            >
              Continue Without Saving
            </button>
          )}
          <button
            type="submit"
            className="py-2 px-3 rounded-lg bg-yellow-100 text-black font-bold"
          >
            {!editCourse ? "Next" : "Save Change"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CourserInformation;
