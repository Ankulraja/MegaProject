import { useEffect, useState } from "react";
import Highlight from "./Highlight";
import { HomePageExplore } from "../../../data/homepage-explore";
import ExploreCard from "./ExploreCard";
const Explore = () => {
  const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];

  const [tab, setTab] = useState(tabName[0]);
  const [course, setCourse] = useState(HomePageExplore[0].courses);
  const [courseTab, setCourseTab] = useState(HomePageExplore[0].courses[0].id);
    console.log(course);
  //   console.log(courseTab)

  const changeHandler = (value) => {
    setTab(value);
    const result = HomePageExplore.filter((e) => e.tag === value);
    setCourse(result[0].courses);
    setCourseTab(result[0].courses[0].id);
    // console.log("Result", result[0].courses[0].id);
  };

  useEffect(() => {
    changeHandler("Free");
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-4xl font-bold ">
        Unlock The <Highlight text="Power Of Code"></Highlight>
      </div>
      <div className="font-bold text-richblack-200 mt-1">
        Learn to build anything you can imagine.
      </div>
      <div className=" flex flex-row gap-8 mt-10 px-5 py-1 rounded-lg bg-richblack-800">
        {tabName.map((val, index) => {
          return (
            <div
              key={index}
              className={`text-richblack-200 cursor-pointer
             hover:bg-richblack-900 hover:text-white
              ${
                tab === val
                  ? "bg-richblack-900 text-white"
                  : "text-richblack-200"
              }
            rounded-full py-2 px-5`}
              onClick={() => changeHandler(val)}
            >
              {val}
            </div>
          );
        })}
      </div>
       <div className="w-full mt-16">
        <div className="flex w-11/12 mx-auto justify-center gap-10 flex-wrap items-center">
         {
          course.map((course,index)=>{
            return <ExploreCard  courseTab={courseTab} setCourseTab={setCourseTab} course={course} key={index}></ExploreCard>
          })
         }
         </div>
       </div>
    
    </div>
  );
};
export default Explore;
