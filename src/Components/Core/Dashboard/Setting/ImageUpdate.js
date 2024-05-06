import { useDispatch, useSelector } from "react-redux";

import Btnyellow from "./Btnyellow";
import { useState } from "react";
import {
  deleteAccount,
  updateProfilePicture,
} from "../../../../Service/Operation/Setting";
const ImageUpdate = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const submitHndler = async (event) => {
    event.preventDefault();
    console.log("img", img);
    const formData = {
      img: img,
    };
    setLoader(true);
    await dispatch(updateProfilePicture(token, formData));
    setLoader(false);
    window.location.reload();
  };
  return (
    <div className="w-11/12  mx-auto py-10 flex items-center gap-5">
      <img
        className="w-[80px] h-[80px] rounded-[50%]"
        src={user.image}
        alt="loading..."
      ></img>
      <div className="flex flex-col gap-4">
        <p>Change Profile Picture</p>

        <form onSubmit={submitHndler} className="flex gap-3">
          <label className="py-2 cursor-pointer px-4 font-bold bg-richblack-400 text-white rounded-lg">
            Select
            <input
              onChange={(event) => {
                setImg(event.target.files[0]);
              }}
              className=" hidden"
              type="file"
              accept="image/*"
            ></input>
          </label>
          <button type="submit">
            {!loader ? (
              <Btnyellow text={"Upload"}></Btnyellow>
            ) : (
              <div className="text-black  bg-yellow-100 py-2 px-5 font-bold rounded-lg cursor-pointer">
                Loading...
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ImageUpdate;
