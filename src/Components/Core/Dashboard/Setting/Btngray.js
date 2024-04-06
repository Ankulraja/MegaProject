import { useDispatch } from "react-redux";
const Btngrey = ({ text, link, path,formData }) => {
  const dispatch = useDispatch();


  return (
    <div className="text-black  bg-richblack-300  py-2 px-5 font-bold rounded-lg cursor-pointer">
      {text}
    </div>
  );
};
export default Btngrey;
