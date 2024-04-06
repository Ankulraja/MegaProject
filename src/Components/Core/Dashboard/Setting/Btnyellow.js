import { useDispatch } from "react-redux";
const Btnyellow = ({ text, link, path,formData }) => {
  const dispatch = useDispatch();


  return (
    <div className="text-black  bg-yellow-100 py-2 px-5 font-bold rounded-lg cursor-pointer">
      {text}
    </div>
  );
};
export default Btnyellow;
