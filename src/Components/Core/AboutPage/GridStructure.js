import Highlight from "../HomePage/Highlight";
import YellowBtn from "../HomePage/YellowBtn";

const GridStructure = () => {
  const GridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];
  return (
    <div className="w-11/12 grid max-lg:grid-cols-1 grid-cols-4 mx-auto py-20 ">
      {GridArray.map((value, index) => {
        return (
          <div key={index}
            className={`${index === 0 && "col-span-2 max-lg:col-span-1 bg-richblack-900"} 
                    ${index % 2 === 1 ? "bg-richblack-600" : "bg-richblack-800"}
                    ${index === 3 && "lg:col-start-2 "} max-lg:w-7/12 max-sm:w-9/12 mx-auto h-[330px] py-1 px-1`}
          >
            {value.order === -1 && (<div className="">
               <h1 className="w-8/12 text-4xl font-bold">{value.heading} <Highlight text={value.highlightText}></Highlight></h1>
               <p className="w-10/12 py-5 text-richblack-200">{value.description}</p>
                
               <YellowBtn text={value.BtnText} linkTo={value.BtnLink}></YellowBtn>
            </div>)}
            {
                value.order !== -1 && (
                    <div className="py-10 px-10">
                        <h1 className="text-[20px]">{value.heading}</h1>
                        <p className="py-5 text-richblack-200">
                            {value.description }
                        </p>
                    </div>
                )
            }
           
          </div>
        );
      })}
    </div>
  );
};
export default GridStructure;
