import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import YellowBtn from "../Components/Core/HomePage/YellowBtn.js";
import GreyBtn from "../Components/Core/HomePage/GreyBtn.js";
import CodeBlock from "../Components/Core/HomePage/CodeBlock.js";
import Highlight from "../Components/Core/HomePage/Highlight.js";
import Tags from "../Components/Core/HomePage/Tags.js";
import ReviewSlider from "../Components/Core/HomePage/ReviewSlider.js";
import Footer from "../Components/Common/Footer.js";
import Explore from "../Components/Core/HomePage/Explore.js";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className= "relative bg-richblack-900 w-screen min-h-screen font-inter flex flex-col py-10">
        <div className="w-11/12  text-white flex flex-col mx-auto justify-between items-center mt-20  ">
          <Link to={"/signup"}>
            <div
              className="flex gap-3 items-center mx-auto
           bg-richblack-800 rounded-full py-3  px-6 text-richblack-200 
           transition-all duration-300  hover:scale-95 cursor-pointer 
           shadow-sm shadow-richblack-100 "
            >
              <p>Become an Instructor</p>
              <p className="">
                <FaArrowRight />
              </p>
            </div>
          </Link>

          <div className="text-4xl font-bold gap-3 my-12">
            Empower your Future with
            <Highlight text="Coding Skill"></Highlight>
          </div>

          <div className="text-center w-10/12 text-[18px] text-richblue-200 font-bold">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>

          <div className="font-bold flex gap-10 my-16">
            <YellowBtn text="Learn More"></YellowBtn>

            <GreyBtn text="Book a Demo"></GreyBtn>
          </div>

          <div className="w-11/12  shadow-[20px_20px_0px_0px_rgba(255,255,255),_0px_0px_40px_15px_rgba(10,70,96)]">
            <video autoPlay loop muted>
              <source src="https://res.cloudinary.com/dkoezhi9u/video/upload/v1711391723/UploadOnly/banner_t7o9ww.mp4"></source>
            </video>
          </div>

          {/* Code Section-1 */}
          <div className="mt-32 w-11/12">
            <CodeBlock
              position="flex-row"
              heading={
                <div className="text-4xl font-semibold">
                  Unlock your
                  <Highlight text={"coding potential "} />
                  with our online courses.
                </div>
              }
              subHeading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              btnYellow={
                <div className="flex items-center gap-2">
                  Try it Yourself <FaArrowRight></FaArrowRight>
                </div>
              }
              btnGray="Learn more"
              colorCode="yellow-50"
              code={`<!DOCTYPE html> \n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
            ></CodeBlock>
          </div>

          {/* Code Section-2 */}
          <div className="w-11/12 mt-32">
            <CodeBlock
              position="flex-row-reverse"
              heading={
                <div className="text-4xl font-semibold">
                  <h1>Start</h1>
                  <Highlight text={"Coding In Seconds "} />
                </div>
              }
              subHeading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              btnYellow={
                <div className="flex items-center gap-2">
                  Continue Lesson <FaArrowRight></FaArrowRight>
                </div>
              }
              btnGray="Learn More"
              // colorCode="richblack-700"
              code={`<!DOCTYPE html> \n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
            ></CodeBlock>
          </div>
          <div className="w-full xl:translate-y-[35%]">
          <Explore></Explore>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div
        className="w-screen h-[370px] bg-[url(https://res.cloudinary.com/dkoezhi9u/image/upload/v1711399300/UploadOnly/bghome_mxwhbw.svg)]
      flex justify-center items-center"
      >
        <div className="flex gap-10 mx-auto mt-40">
          <YellowBtn
            text={
              <div className="flex items-center gap-2">
                Explore Full Catlog <FaArrowRight></FaArrowRight>
              </div>
            }
          ></YellowBtn>
          <GreyBtn text="Learn More"></GreyBtn>
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-screen bg-richblack-5 pb-10 ">
        {/* Part-1 */}
        <div className="py-24 w-10/12 mx-auto flex flex-row flex-wrap  items-center justify-center">
          <h1 className="max-w-1/2 text-4xl font-semibold lg:w-[45%]">
            Get the Skills you need for a
            <Highlight text={"Job that is in demand"} />
          </h1>
          <div className="w-1/2 mt-10">
            <div className="w-4/5 mx-auto flex flex-col gap-10">
              <p>
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <YellowBtn text="Learn More"> </YellowBtn>
            </div>
          </div>
        </div>

        {/* Part-2 */}

        <div className="w-10/12 flex flex-row flex-wrap  mx-auto items-center justify-center ">
          <div className="flex flex-col gap-5 mx-auto w-1/2 pt-40">
            <Tags
              title="Leadership"
              subTitle="Fully committed to the success company"
              img="https://res.cloudinary.com/dkoezhi9u/image/upload/v1711401021/UploadOnly/Logo1_rijbps.svg"
            ></Tags>
            <Tags
              title="Education"
              subTitle="Learning committed to the success "
              img="https://res.cloudinary.com/dkoezhi9u/image/upload/v1711401021/UploadOnly/Logo2_evkg2l.svg"
            ></Tags>
            <Tags
              title="Precious"
              subTitle="Became day by day Precious"
              img="https://res.cloudinary.com/dkoezhi9u/image/upload/v1711401021/UploadOnly/Logo3_wxyty9.svg"
            ></Tags>
            <Tags
              title="Comment"
              subTitle="Fully committed to the success company"
              img="https://res.cloudinary.com/dkoezhi9u/image/upload/v1711401021/UploadOnly/Logo4_zsrkya.svg"
            ></Tags>
          </div>
          <div className=" lg:w-1/2 lg:pt-0 pt-16 w-10/12 ">
            <div className="w-11/12 border relative shadow-[20px_20px_0px_0px_rgba(255,255,255),_0px_0px_40px_15px_rgba(10,70,96)]">
              <img
                className="w-full"
                alt="..."
                src="https://res.cloudinary.com/dkoezhi9u/image/upload/v1711402087/UploadOnly/TimelineImage_qsiguz.png"
              ></img>

              <div
                className=" flex flex-row absolute left-[50%] translate-x-[-48%] translate-y-[-50%] 
               w-11/12 py-5 flex-wrap text-white px-8 gap-5 bg-caribbeangreen-700
               max-lg:top-[14%] max-lg:left-36 max-lg:w-[300px] max-lg:h-[120px]"
              >
                <div
                  className="lg:w-5/12 flex flex-row justify-center text-center lg:flex-wrap lg:gap-3  items-center
                  max-lg:gap-4"
                >
                  <div className="text-2xl font-bold">10</div>
                  <div className="text-richblack-100 text-[14px]">
                    YEARS OF EXPERIENCE
                  </div>
                </div>
                <div
                  className="lg:h-[50px] lg:border-r  border-caribbeangreen-100 
                "
                ></div>
                <div
                  className="  lg:w-5/12 flex flex-row justify-center  lg:flex-wrap lg:gap-3 items-center
                max-lg:gap-4"
                >
                  <div className="text-2xl font-bold">250</div>
                  <div className="text-richblack-100 text-[14px]">
                    TYPE OF COURSES
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part-3 */}

        <div className="w-11/12  mt-44 mx-auto flex flex-col justify-center gap-5  items-center">
          <div className="text-4xl font-bold gap-3  items-center justify-center ">
            Your Swiss Knife for
            <Highlight text="learning any language"></Highlight>
          </div>
          <p className="text-center w-8/12 text-richblack-700 font-semibold">
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over, progress tracking, custom schedule
            and more.
          </p>
        </div>

        {/* Part-4 */}
        <div className="w-full   mt-10">
          <div className="w-10/12 mx-auto flex flex-wrap">
            <div className="lg:mt-10 ">
              <img
                src="https://res.cloudinary.com/dkoezhi9u/image/upload/v1711434597/UploadOnly/Know_your_progress_saxdx1.png"
                alt="loading..."
              ></img>
            </div>
            <div className="lg:-ml-32 ">
              <img
                src="https://res.cloudinary.com/dkoezhi9u/image/upload/v1711434597/UploadOnly/Compare_with_others_od5qjl.png"
                alt="loading..."
              ></img>
            </div>
            <div className="lg:-ml-32">
              <img
                src="https://res.cloudinary.com/dkoezhi9u/image/upload/v1711434597/UploadOnly/Plan_your_lessons_mncigw.png"
                alt="loading..."
              ></img>
            </div>
          </div>
        </div>
        <div className=" w-full">
          <div className="mx-auto w-1/2 text-center">
            <YellowBtn text="Learn More"></YellowBtn>
          </div>
        </div>
      </div>

      {/* Section-4 */}
      <div className="w-screen py-20 bg-richblack-900">
        {/* Part-1 */}
        <div className="w-11/12 mx-auto flex flex-row flex-wrap">
          <div className=" md:w-1/2 shadow-[-20px_-20px_0px_0px_rgba(255,255,255)]">
            <img
              alt="loading..."
              className="w-full"
              src="https://res.cloudinary.com/dkoezhi9u/image/upload/v1711445469/UploadOnly/Instructor_o36vsy.png"
            ></img>
          </div>
          <div className="md:w-1/2 md:pt-0 pt-14 flex items-center">
            <div className="w-8/12 mx-auto  flex flex-col gap-10">
              <div className="text-white font-bold text-4xl">
                Become an
                <Highlight text="Instructor"></Highlight>
              </div>
              <div className="text-richblack-200">
                Instructors from around the world teach millions of students on
                StudyNotion. We provide the tools and skills to teach what you
                love.
              </div>
              <div>
                <YellowBtn
                  text={
                    <div className="flex items-center gap-3">
                      Start Learning Today
                      <FaArrowRight></FaArrowRight>
                    </div>
                  }
                ></YellowBtn>
              </div>
            </div>
          </div>
        </div>

        <div className="text-white mt-20 text-center font-bold text-5xl">
          Reviews From Other Learners
        </div>
        {/* Review Slider */}
        <div className="text-white">
          <ReviewSlider></ReviewSlider>
        </div>
      </div>

      {/* Footer*/}
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};
export default Home;
