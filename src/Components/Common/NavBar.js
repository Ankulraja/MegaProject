import { Link } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { FaCircleChevronDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ProfileDropDown from "../Core/Auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { categories } from "../../Service/apis";

const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  // const token = "abc";
  const { user } = useSelector((state) => state.profile);
  const { totalItem } = useSelector((state) => state.cart);

  const [subLink, setSubLink] = useState();

  // const subLink = [
  //   {
  //     title: "WebDevelopment",
  //   },
  //   {
  //     title: "Android Development",
  //   },
  // ];

  const call = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);

      // console.log("Categories", result.data.allCategory);
      setSubLink(result.data.allCategory);
    } catch (e) {
      console.log("Could not Fetch the Categories Data", e);
    }
  };
  // console.log("After", subLink);
  useEffect(() => {
    call();
  }, []);

  const location = useLocation();
  const matchRoute = (path) => {
    return path === location.pathname;
  };

  return (
    <div className="w-screen h-[50px] flex justify-center items-center bg-[rgba(0,12,35)] border-b border-b-richblack-700">
      <div className="w-10/12 h-full border flex items-center mx-auto">
        <div className="w-1/3  flex items-center ">
          <Link to={"/"}>
            <img
              alt="load..."
              src="https://res.cloudinary.com/dkoezhi9u/image/upload/v1711607109/UploadOnly/Logo-Full-Light_ea6h6a.png"
            ></img>
          </Link>
        </div>
        <div className="w-1/3 font-semibold flex items-center  justify-between text-richblack-100 ">
          {NavbarLinks?.map((val, index) => {
            return (
              <div key={index} className="hover:text-yellow-100">
                {val.title === "Catalog" ? (
                  <div className="cursor-pointer relative flex transition-all ease-in-out duration-800  items-center gap-2 group">
                    {val.title}
                    <span className="text-richblack-200">
                      <FaCircleChevronDown></FaCircleChevronDown>
                    </span>
                    <div 
                      className="invisible absolute transition-all ease-in-out duration-200  group-hover:visible bg-white rounded-md w-[30px] 
                    h-[30px] z-10 top-[100%] translate-y-2 left-[75%] rotate-45"
                    ></div>
                    <div 
                      className="invisible absolute transition-all ease-in-out duration-200 group-hover:visible z-10 top-[100%] translate-y-4 -translate-x-[35%]
                     bg-white w-[300px]  rounded-lg flex flex-col  py-5 px-5 "
                    >
                      {subLink?.map((val, index) => {
                        return (
                          <Link>
                            {" "}
                            <div
                              key={index}
                              className=" text-black  hover:bg-richblack-100 rounded-lg py-4 px-4 "
                            >
                              {val.name}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${
                      matchRoute(val.path)
                        ? "text-yellow-50"
                        : "text-richblack-100 hover:text-yellow-100"
                    } `}
                  >
                    <Link to={`${val.path}`}>{val.title}</Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Login, SignUp and Dashboard */}

        <div className="w-1/3  text-white flex justify-end gap-5 items-end">
          {token === null && (
            <Link to="/login">
              <div
                className={`py-2 px-3 bg-richblack-700 rounded-lg border border-richblack-200 transition-all duration-200 
           hover:border hover:border-caribbeangreen-300
           ${
             matchRoute("/login")
               ? " text-caribbeangreen-200 border border-caribbeangreen-300"
               : "bg-richblack-700"
           }
          `}
              >
                Login{" "}
              </div>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <div
                className={`py-2 px-3 bg-richblack-700 rounded-lg border border-richblack-200 transition-all duration-200 
           hover:border hover:border-caribbeangreen-300
           ${
             matchRoute("/signup")
               ? " text-caribbeangreen-200 border border-caribbeangreen-300"
               : "bg-richblack-700"
           }
          `}
              >
                Sign Up{" "}
              </div>
            </Link>
          )}
          {token && (
            <div className="">
              <ProfileDropDown></ProfileDropDown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavBar;
