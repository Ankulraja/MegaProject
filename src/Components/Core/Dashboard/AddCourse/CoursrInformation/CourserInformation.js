import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseCategories } from "../../../../../Service/Operation/Course";
import { LiaRupeeSignSolid } from "react-icons/lia";
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import RequirementFeild from "./RequirementFeild";
const CourserInformation = () => {
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [courseCategories, setCourseCategories] = useState([]);
  const {
    register,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    const getCategories = async () => {
      const getCategoriesData = await fetchCourseCategories();
      // console.log("....................getCategories",getCategoriesData)

      setCourseCategories(getCategoriesData);
    };
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.description);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tags);
      setValue("courseBenefits", course.whatWillYouLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();
  }, []);

  const submitForm = (data) => {
    console.log("Data...........", data);
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


        <button className="py-2 px-3 rounded-lg bg-yellow-100 text-black font-bold">
          Next
        </button>
      </form>
    </div>
  );
};
export default CourserInformation;
