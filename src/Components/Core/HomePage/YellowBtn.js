import { Link } from "react-router-dom";
const YellowBtn = ({text,linkTo}) => {
  return (
    <Link to={linkTo}>
    <button
      className="py-3 px-6 font-bold cursor-pointer bg-yellow-50 text-richblack-900 rounded-md
          shadow-lg shadow-richblack-500 transition-all duration-300 hover:shadow-none hover:scale-95"
    >
      {text}
    </button>
    </Link>
  );
};
export default YellowBtn;
