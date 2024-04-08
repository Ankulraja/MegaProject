import { useState } from "react";

import { MdDeleteForever } from "react-icons/md";
import DeleteModal from "./DeleteModal";
const DeleteAccount = () => {
    
  const [deleteModalData, setDeleteModalData] = useState("");
  // console.log(deleteModalData)
  return (
    <div className="w-11/12 mx-auto py-9 flex flex-row gap-4">
      <button className="text-4xl  bg-pink-700 text-pink-200 w-[60px] h-[60px] rounded-[50%] flex justify-center items-center">
        <MdDeleteForever></MdDeleteForever>
      </button>
      <div className="flex flex-col w-7/12">
        <h1 className="font-bold text-[18px]">Delete Account</h1>
        <p className="text-pink-25">Would you like to delete account?</p>
        <p className="text-pink-25">
          This account may contain Paid Courses. Deleting your account is
          permanent and will remove all the contain associated with it.
        </p>
        <button 
        onClick={()=>{
            setDeleteModalData({
                text1: "Are You Sure !!",
                text2: "You Want To Delete Your Account",
                btn1Text:"Delete",
                btn2Text:"Cancle",
                // btn1Handler: ()=> dispatch(deleteAccount(navigate))
                btn2Handler: ()=> setDeleteModalData(null)
              })
        }}
         className=" mt-5 w-7/12 py-5 border bg-pink-200">
          I Want to Delete My Account
        </button>
      </div>
      
      {deleteModalData && (<DeleteModal modalData={deleteModalData}></DeleteModal>)}
    </div>
  );
};
export default DeleteAccount;
