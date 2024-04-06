import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import SideBarContent from "../Dashboard/SideBarContent";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import { useState } from "react";
import { logout } from "../../../Service/Operation/authAPI";
import ConfirmationModal from "../../Common/ConfirmationModal"
const SideBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading: profileLoading, user } = useSelector(
    (state) => state.profile
  );
  const [confirmModal, setConfirmModal] = useState();
  const SideBarLinkContent = {
    id: 1,
    name: "Setting",
    path: "/dashboard/setting",
    // type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscSettingsGear",
  };

  //   console.log("User",user.accountType)
  const { loading: authLoading } = useSelector((state) => state.auth);
  if (profileLoading || authLoading) {
    return <div>Spinner</div>;
  }
  return (
    <div className="max-w-[222px] h-[calc(100vh-3rem)] py-16 border-r-[0.5px] border-r-richblack-600  bg-richblack-800 text-white">
      <div className="my-1">
        <SideBarContent val={sidebarLinks[0]}></SideBarContent>
      </div>
      <div className=" flex flex-col gap-1 w-full ">
        {sidebarLinks.map((val, index) => {
          if (val.type === user?.accountType) {
            return (
              <div key={index} className="flex flex-col  w-full ">
                <SideBarContent key={val.id} val={val}></SideBarContent>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="w-10/12 h-[0.2px] bg-richblack-600 mt-10 mx-4"></div>
      <div className="mt-10">
        <SideBarContent val={SideBarLinkContent}></SideBarContent>
      </div>

      <div className=" w-full ml-10 my-2 text-richblack-200">
        <button
          onClick={() => {
            setConfirmModal({ text1: "Are you sure?",
            text2: "You will be logged out of your account.",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: ()=> dispatch(logout(navigate)),
            btn2Handler: ()=> setConfirmModal(null),});
          }}
        >
          <div className="flex flex-row items-center gap-2">
            <VscSignOut></VscSignOut>
            Logout
          </div>
        </button>
      </div>
      {confirmModal && (<ConfirmationModal modalData={confirmModal}></ConfirmationModal>)}
    </div>
  );
};
export default SideBar;
