import { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { TbHierarchy3 } from "react-icons/tb";
const ExploreCard = (props) => {
  const course = props.course;
  const courseTab = props.courseTab;
  const setCourseTab = props.setCourseTab;
  const [courseNumber, setCourseNumber] = useState(props.course.id);
  // const [heading,setHeading] = useState()
  console.log("co", course.id);
  // console.log("co",courseTab)
  // console.log("courseTab",courseTab.heading)
  return (
    <div
      className={`w-[375px] bg-richblack-800 font-inter transition-all duration-400
    pt-8 hover:bg-white hover:text-black cursor-pointer my-5 
    ${
      courseTab === courseNumber
        ? "bg-white text-black shadow-[13px_13px_0px_0px_rgba(255,230,0)]"
        : "bg-richblack-800"
    }`}
    onClick={()=>{setCourseTab(course.id)}}
    >
      <h1 className="font-bold px-7">{course.heading}</h1>
      <p className="pt-8 pb-32 px-7 text-richblack-300 border-b-2 border-dashed border-richblack-500 ">
        {course.description}
      </p>
      <div className="flex flex-row justify-between px-10 py-4 text-caribbeangreen-400">
        <div className="flex gap-3 items-center">
          <BsFillPeopleFill></BsFillPeopleFill>
          {course.level}
        </div>
        <div className="flex gap-3 items-center">
          <TbHierarchy3></TbHierarchy3>
          {course.lessionNumber} Lession
        </div>
      </div>
    </div>
  );
};
export default ExploreCard;
