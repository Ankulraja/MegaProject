import { Link } from "react-router-dom";
const GreyBtn = ({text,linkTo}) => {
  return (
    <Link to={linkTo}>
    <button
      className="py-3 px-6 font-bold text-white bg-richblack-600 cursor-pointer rounded-md
          shadow-lg shadow-richblue-500 transition-all duration-300 hover:shadow-none hover:scale-95"
    >
   {text}
    </button>
    </Link>
  );
};
export default GreyBtn;
