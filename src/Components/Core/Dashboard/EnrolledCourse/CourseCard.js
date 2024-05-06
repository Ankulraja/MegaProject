import ProgressBar from "@ramonak/react-progress-bar";
const CourseCard = () => {
  return (
    <div className="flex py-3 border-[0.1px] border-pure-greys-700 px-5 text-sm rounded-md">
      <div className="w-2/4 flex items-center gap-5">
        <img
          alt="..."
          src="https://res.cloudinary.com/dkoezhi9u/image/upload/v1714931669/Study/eixfy7fnfx3mq2ktszvk.jpg"
          className="w-[50px] h-[50px]  rounded-lg"
        ></img>
        <div>
          <h3 className="text-richblack-5">The Complete python</h3>
          <p className="text-richblack-200">Sort Description</p>
        </div>
      </div>
      <div className="w-1/4 text-richblack-25">2hr 30min</div>
      <div className="w-1/4 text-richblack-25 flex flex-col justify-evenly">
        <div>Progress: {"65%"}</div>
        <div ><ProgressBar height="8px" isLabelVisible={false} bgColor="blue" borderRadius="5px" completed={60} maxCompleted={100}></ProgressBar></div>
      </div>
    </div>
  );
};
export default CourseCard;
