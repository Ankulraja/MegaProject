import { FaCaretDown } from "react-icons/fa";
import { RiDashboard2Line } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useState,useEffect,useRef } from "react";

const ProfileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
};

const closeDropdown = (event) => {

    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex gap-1 items-center cursor-pointer">
        <div className="w-[35px] h-[35px] rounded-[50%] bg-white group" onClick={toggleDropdown}>
          <img
            className="w-full h-full rounded-[50%] "
            alt=".."
            src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=1800&t=st=1711665041~exp=1711665641~hmac=093b8ece07276e014ef31dc674b3357d3511d34742e16569b523c12ef526919f"
          ></img>
        </div>
        <div onClick={toggleDropdown}>
          <FaCaretDown />
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-[110%] -translate-x-[45%] rounded-lg z-20 
        w-[130px] border-[0.1px] border-richblack-200 text-richblack-200 
        bg-richblack-800">
          <Link to={"/dashboard"} className="block">
            <div className="flex gap-1 items-center px-3 border-b-[0.1px] border-b-richblack-200 py-2">
              <RiDashboard2Line />
              Dashboard
            </div>
          </Link>
          <Link to={"/dashboard"} className="block">
            <div className="flex gap-1 items-center px-3 py-2">
              <TbLogout />
              Logout
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
