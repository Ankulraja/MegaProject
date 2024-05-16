import { useEffect, useState } from "react";
import CoursesCard from "./CoursesCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setCourse } from "../../../../Slices/courseSlice";
import { fetchInstructorCourses } from "../../../../Service/Operation/Course";
const MyCourse = () => {
  const [courses, setCourses] = useState([]);

  const {token} = useSelector((state)=> state.auth);
  const navigate = useNavigate();
  
  console.log("Course .......",courses)

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      console.log("result .......",result)
      if(result) setCourses(result)
    }
    fetchCourses()
  }, [])
  


  return (
    <div className="text-white relative">
      <h1 className="text-3xl">MyCourse</h1>

      {/* Title */}
      <div className="flex mt-10 bg-richblack-800 py-3 px-5 rounded-t-lg">
        <div className="w-3/5">Courses</div>
        <div className="w-2/5 flex ">
          <p className="w-1/3">Duration</p>
          <p className="w-1/3">Price</p>
          <p className="w-1/3">Action</p>
        </div>
      </div>

      {/* Course Part */}
      <div className="border-[0.1px] border-richblack-800 rounded-b-lg">
        {courses?.length === 0 ? (
          <div className="py-40 text-3xl text-center text-richblack-500 flex justify-center items-center gap-2">
            Create Courses{" "}
            <Link to={"/dashboard/add-course"}>
              <div className="text-caribbeangreen-400 underline text-lg">
                Click Here
              </div>
            </Link>
          </div>
        ) : (
          <div>
            {courses?.map((value, index) => (
              <CoursesCard key={index} value={value}></CoursesCard>
            ))}
          </div>
        )}
      </div>
      <Link to={"/dashboard/add-course"}>
        <button className="flex absolute top-[1%] right-[0%] justify-center items-center gap-1 font-bold py-2 px-4 text-lg rounded-lg bg-yellow-100  text-black">
          <IoIosAddCircleOutline></IoIosAddCircleOutline>New
        </button>
      </Link>
    </div>
  );
};
export default MyCourse;
