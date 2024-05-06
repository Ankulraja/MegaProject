import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnrolledCourse } from "../../../../Service/Operation/Profile";
import CourseCard from "./CourseCard";

const Enroll = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourse, setEnrolledCourse] = useState([""]);
  const getUserCourse = async () => {
    const response = dispatch(getEnrolledCourse(token));
    console.log("enroll ka hai", response);
  };
  useEffect(() => {
    // getUserCourse()
  });

  return (
    <div className="text-white">
      <h1 className="text-3xl">Enrolled Courses</h1>
      {/* Future toogle section */}

      {/* Course Content */}
      <div className="w-full flex mt-10 py-4 px-5 rounded-t-lg bg-richblack-700 text-sm text-richblack-50 ">
        <div className="w-2/4 ">Course Name </div>
        <div className="w-1/4 ">Durations</div>
        <div className="w-1/4 ">Progress</div>
      </div>
      <div className="border-[0.1px] text-richblack-700 rounded-b-lg">
      {enrolledCourse?.length === 0 ? (
        <div className="py-40 text-center text-4xl text-pure-greys-500">
          No Course Found
        </div>
      ) : (
        <div>
          {enrolledCourse?.map((value, index) => (
            <CourseCard key={index} value={value}></CourseCard>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};
export default Enroll;
