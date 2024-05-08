import { useSelector } from "react-redux";
import { MdOutlineDone } from "react-icons/md";
import CourserInformation from "./CoursrInformation/CourserInformation";
import CourseBuilder from "./CourseBuilder/CourseBuilder";
import Public from "./Public/Public";
const RenderStep = () => {
  // const { step } = useSelector((state) => state.course);
  const step = 1;
  const items = [
    {
      id: 1,
      name: "Course Information",
    },
    {
      id: 2,
      name: "Course Builder",
    },
    {
      id: 3,
      name: "Publish",
    },
  ];
  return (
    <div className="text-white">
      <div className="w-10/12 mx-auto flex justify-between ">
        {items.map((val, index) => (
          <div className="w-1/3 flex flex-col justify-center gap-2">
            <div className="flex justify-start items-center relative z-20">
              <div
                key={index}
                className={`border-[0.5px] border-richblack-500 text-richblack-200
           bg-richblack-700 w-8 h-8 rounded-[50%] flex justify-center items-center
           ${
             step >= val.id
               ? "bg-yellow-700 border-yellow-100 text-yellow-5"
               : ""
           }  `}
              >
                {step > val.id ? (
                  <p className="text-black bg-yellow-100 w-full h-full rounded-[50%] flex items-center justify-center font-bold">
                    <MdOutlineDone></MdOutlineDone>
                  </p>
                ) : (
                  <p>{val.id}</p>
                )}
              </div>
              {step + 1 >= val.id && val.id < 3 && (
                <div
                  className={`w-full -z-10 absolute border border-dashed border-richblack-700
                   ${step > val.id ? "border-yellow-100" : ""}`}
                ></div>
              )}
            </div>
            <div
              className={`text-[12px] text-richblack-400
            ${step >= val.id ? " text-white" : ""}`}
            >
              {val.name}
            </div>
          </div>
        ))}
      </div>
      <div className="my-10">
        {step === 1 && (<CourserInformation></CourserInformation>)}
        {step === 2 && (<CourseBuilder></CourseBuilder>)}
        {step === 3 && (<Public></Public>)}
      </div>
    </div>
  );
};
export default RenderStep;
