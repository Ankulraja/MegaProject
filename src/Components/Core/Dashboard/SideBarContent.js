import * as Icons from "react-icons/vsc";
import { NavLink, useLocation ,matchPath} from "react-router-dom";

const SideBarContent = ({ val }) => {
  const Icon = Icons[val.icon];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink to={val.path}
      className={`${
        matchRoute(val.path)
          ? "bg-yellow-700 text-yellow-25 border-l-4 border-l-yellow-5"
          : "text-richblack-200"
      } text-richblack-200 w-full py-2 pl-10 flex flex-row items-center gap-2`}
    >
      <Icon className="text-lg" />
      {val.name}
    </NavLink>
  );
};
export default SideBarContent;
