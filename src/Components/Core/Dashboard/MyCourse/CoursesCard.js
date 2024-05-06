import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const CoursesCard = () => {
  return (
    <div className="flex py-5 px-5">
      <div className="w-3/5 flex">
        <div className="w-2/5  ">
          <img
            className="w-full h-full rounded-lg "
            alt="..."
            src="https://assets-global.website-files.com/6344c9cef89d6f2270a38908/65725709c91402ab52b1c2b9_Best%207%2B%20Coding%20Languages%20for%20a%20SaaS%20Tech%20Stack%202023%20Guide-p-1080.webp"
          ></img>
        </div>
        <div className="w-3/5 px-5 flex flex-col justify-between pb-10">
          <h1 className="text-lg">The Complete Python Course and Bootcamp</h1>
          <p className="text-richblack-500">
            This Course Provide you a depth knowledge about Python and Their
            liberies
          </p>
          <div className="flex gap-2 text-sm">
            <p>
              Created: <span className="text-richblack-200">27/April/2023</span>{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="w-2/5 flex justify-center items-center text-richblack-300">
        <div className="w-1/3">20hr 10min</div>
        <div className="w-1/3">Rs. 1,999</div>
        <div className="w-1/3 flex justify-evenly items-center text-2xl">
            <button><MdOutlineModeEdit></MdOutlineModeEdit></button>
            <button><MdDelete></MdDelete></button>
        </div>
      </div>
    </div>
  );
};
export default CoursesCard;
