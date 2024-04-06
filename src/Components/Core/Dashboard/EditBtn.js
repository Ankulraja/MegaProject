import { LiaEdit } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditBtn = ({ text, link }) => {
  return (
    <NavLink to={link}>
      <div
        className="flex items-center gap-3 text-lg font-bold bg-yellow-50 py-2 px-4 rounded-lg text-black"
      >
        {text}
        <LiaEdit></LiaEdit>
      </div>
    </NavLink>
  );
};
export default EditBtn;
