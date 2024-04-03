import Achivement from "../Components/Core/AboutPage/Achivement";
import ContactForm from "../Components/Core/AboutPage/ContactForm";
import GridStructure from "../Components/Core/AboutPage/GridStructure";
import Highlight2 from "../Components/Core/AboutPage/Highlight2";
import Highlight3 from "../Components/Core/AboutPage/Highlight3";
import Highlight from "../Components/Core/HomePage/Highlight";
import Footer from "../Components/Common/Footer"
const About = () => {
  return (
    <div className="text-white w-screen min-h-screen bg-richblack-900 ">
      {/* Section-1 */}
      <div className="w-full   bg-richblack-700 pt-20">
        <div className=" w-6/12 mx-auto flex flex-col items-center text-center ">
          <div className="text-4xl font-bold ">
            Driving Innovation in Online Education for a{" "}
            <Highlight text="Brighter Future"></Highlight>{" "}
          </div>
          <p className="pt-5 text-richblack-200">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </div>
        <div className="border xl:translate-y-[30%] w-10/12 mx-auto flex flex-row flex-wrap items-center justify-center gap-5">
          <img
            src="https://res.cloudinary.com/dkoezhi9u/image/upload/v1712093343/UploadOnly/aboutus1_cyag3y.webp"
            alt="loading..."
          ></img>
          <img
            src="https://res.cloudinary.com/dkoezhi9u/image/upload/v1712093342/UploadOnly/aboutus2_msct1r.webp"
            alt="loading..."
          ></img>
          <img
            src="https://res.cloudinary.com/dkoezhi9u/image/upload/v1712093342/UploadOnly/aboutus3_d8bsjk.webp"
            alt="loading..."
          ></img>
        </div>
      </div>

      {/* Section-2 */}
      <div className="w-11/12 xl:pt-36 pt-10 pb-20  mx-auto text-center ">
        <div className="text-4xl font-bold">
          We are passionate about revolutionizing the way we learn. Our
          innovative platform
          <Highlight text="combines technology "> </Highlight> ,{" "}
          <Highlight2 text="expertise"></Highlight2> and community to create an{" "}
          <Highlight2 text="unparalleled educational experience."></Highlight2>
        </div>
      </div>
      <div className="border-b-[0.1px] border-b-richblack-200"></div>

      {/* Section-3 */}
      <div className="w-11/12  mx-auto">
        <div className="w-full flex flex-row justify-center items-center max-lg:flex-col">
          <div className="w-1/2 py-20 px-5 max-lg:w-11/12">
            <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
              Our Founding Story
            </h1>
            <p className="text-richblack-200 my-10">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className="text-richblack-200">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          <div className="w-1/2 flex justify-center items-center max-lg:w-11/12">
            <div>
              <img
                className="shadow-[_0px_0px_25px_2px_rgba(175,20,20,1)]"
                src="https://res.cloudinary.com/dkoezhi9u/image/upload/v1712095745/UploadOnly/FoundingStory_kb1q3u.png"
                alt="loading..."
              ></img>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-row justify-center items-center max-md:flex-col">
          <div className="w-1/2 py-20 px-5 max-md:w-11/12">
            <div className="w-10/12 mx-auto max-md:w-11/12">
              <h1 className="text-4xl font-bold">
                <Highlight2 text="Our Vision"></Highlight2>
              </h1>
              <p className="text-richblack-200 my-10 max-lg:my-5">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
          </div>

          <div className="w-1/2 py-20 px-5 max-md:w-11/12 max-md:py-0">
            <div className="w-9/12 mx-auto max-md:w-11/12">
              <h1 className="text-4xl font-bold">
                <Highlight text="Our Mission"></Highlight>
              </h1>
              <p className="text-richblack-200 my-10 max-lg:my-4">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section-3 */}
      <div className="w-full bg-richblack-700">
        <Achivement></Achivement>
      </div>

      {/* Section-4 */}

      <div className="w-full">
        <GridStructure></GridStructure>
      </div>

      {/* Section-5 */}
      <div className="w-full">
        <div className="w-5/12 mx-auto  text-white flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold ">Get In Touch</h1>
          <p className="text-richblack-200 py-5">
            We'd love to here for you, Please fill out this form.
          </p>
          <ContactForm></ContactForm>
        </div>
      </div>

      <div>
        Review Slider
      </div>
      <div className="w-full mt-20">
           <Footer></Footer>
      </div>
    </div>
  );
};

export default About;
