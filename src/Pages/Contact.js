import { IoChatbubbles } from "react-icons/io5";
import { FaEarthAmericas } from "react-icons/fa6";
import { MdWifiCalling } from "react-icons/md";
import ContactUsForm from "../Components/Core/AboutPage/ContactForm";
import Footer from "../Components/Common/Footer";
const Contact = () => {
  const contactData = [
    {
      title: "Chat on us",
      desc: "Our friendly team is here to help.",
      address: "info@studynotion.com",
      icone: <IoChatbubbles></IoChatbubbles>
    },
    {
      title: "Visit us",
      desc: "Come and say hello at our office HQ.",
      address:
        "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
        icone: <FaEarthAmericas></FaEarthAmericas>
    },
    {
      title: "Call us",
      desc: "Mon - Fri From 8am to 5pm",
      address: "+123 456 7869",
      icone: <MdWifiCalling></MdWifiCalling>
    },
  ];
  return (
    <div className="w-screen min-h-screen bg-richblack-900 text-white">
      <div className="w-11/12 pt-24 mx-auto  flex lg:flex-row flex-col justify-center max-lg:gap-10 max-lg:items-center" >
        <div className="w-5/12 max-lg:w-9/12">
          <div
            className="w-11/12 mx-auto  flex flex-col  gap-10
          justify-between py-10 px-10 rounded-lg bg-richblack-800 "
          >
            {contactData.map((val, index) => {
              return (
                <div key={index}>
                  <div className="flex flex-row  items-center gap-4 ">
                    <div className="text-richblack-200 text-2xl">{val.icone}</div>
                    
                    <h1 className="font-bold text-lg">{val.title}</h1>
                  </div>
                  <p className="text-richblack-200">{val.desc}</p>
                  <p className="text-richblack-200 font-semibold">
                    {val.address}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-7/12 mx-auto max-lg:w-10/12">
            <div className="w-full py-14 px-12 rounded-xl mx-auto border-[1px] border-richblack-700">
              <h1 className="text-5xl font-bold">Got a Idea? We've got the skills. Let's team up</h1>
              <p className="my-8 text-richblack-200">Tell us more about yourself and what you're got in mind.</p>
              <ContactUsForm></ContactUsForm>
            </div>
        </div>
      </div>

      <div>
        Review Slider
      </div>
      <div className="w-full mt-16">
           <Footer></Footer>
      </div>
    </div>
  );
};
export default Contact;
