import { useDispatch, useSelector } from "react-redux";

import Btnyellow from "./Btnyellow";
import { useState } from "react";
const ImageUpdate = () => {
  const { user } = useSelector((state) => state.profile);
  const [img,setImg] =useState();
  const submitHndler =(event)=>{
    event.preventDefault();
        console.log("img",img);
  }
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
            <input onChange={(event)=>{setImg(event.target.files)}} className=" hidden" type="file" accept="image/*"></input>
          </label>
          <button type="submit">
            <Btnyellow text={"Upload"}></Btnyellow>
          </button>
       
        </form>
      </div>
    </div>
  );
};
export default ImageUpdate;
