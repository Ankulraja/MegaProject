import { AiFillThunderbolt } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import RenderStep from "./RenderStep";
const AddCourse = () => {
  return (
    <div className="text-white w-10/12 mx-auto">
      <h2 className="text-xl">AddCourse</h2>
      <div className="w-full flex">
        <div className="w-2/3  py-10 px-5">
          <RenderStep></RenderStep>
          </div>
        <div className="w-1/3 h-fit mx-auto text-[12px] bg-richblack-800 rounded-lg border-[0.1px] border-richblack-500 px-4 py-4 ">
          <p className="text-base pb-4 flex  items-center gap-1 ">
            {" "}
            <span className="text-yellow-200">
              <AiFillThunderbolt></AiFillThunderbolt>{" "}
            </span>
            Course Upload Tips
          </p>
          <ul className="flex flex-col gap-2 text-richblack-100">
            <li className="flex gap-1 ">
              <span>
                <GoDotFill></GoDotFill>
              </span>
              Set the Course Price option or make it free.
            </li>
            <li className="flex gap-1 ">
              <span>
                <GoDotFill></GoDotFill>
              </span>
              Standard size for the course thumbnail is 1024x576.
            </li>
            <li className="flex gap-1 ">
              <span>
                <GoDotFill></GoDotFill>
              </span>
              Video section controls the course overview video.
            </li>
            <li className="flex gap-1 ">
              <span>
                <GoDotFill></GoDotFill>
              </span>
              Course Builder is where you create & organize a course.
            </li>
            <li className="flex gap-1 ">
              <span>
                <GoDotFill></GoDotFill>
              </span>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li className="flex gap-1 ">
              <span>
                <GoDotFill></GoDotFill>
              </span>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li className="flex items-center gap-1 ">
              <span>
                <GoDotFill></GoDotFill>
              </span>
              Make Announcements to notify any important
            </li>
            <li className="flex items-center gap-1 ">
              <span>
                <GoDotFill></GoDotFill>
              </span>
              Notes to all enrolled students at once
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
