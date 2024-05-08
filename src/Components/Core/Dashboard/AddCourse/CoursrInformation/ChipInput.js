// import React from 'react'
// import { useEffect } from 'react';
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
// import { useSelector } from 'react-redux'
// import { GrFormClose } from "react-icons/gr"
// const ChipInput = ({
//     label, name,
//   placeholder,
//   register,
//   errors,
//   setValue,
//   getValues,
// }) => {
//     const {course, editCourse} = useSelector((state)=>state.course);
//     const [chips, setChips] = useState([])
//     useEffect(() => {
//       if(editCourse) {
//         setChips(JSON.parse(course?.tags))
//       }
//       register(name, {required:true, validate: (value)=> value.length > 0})

//     }, [])

//     useEffect(() => {
//       setValue(name, chips)
//     }, [chips])

//     const handleKeyDown = (e) => {
//         if (e.key === "Enter" || e.key === ",") {
//             e.preventDefault();
//             const chipValue = e.target.value.trim();

//             if(chipValue && !chips.includes(chipValue)){
//                 setChips([...chips, chipValue])
//                 e.target.value = ""
//             }
//         }
//     }

//     const handleDeleteChip = (chipIndex) => {
//         const newChips = chips.filter((curr, ind) => ind!==chipIndex )
//         setChips(newChips)
//     }
//   return (
//     <div className="flex flex-col space-y-2">
//       {/* Render the label for the input */}
//       <label className="text-sm text-richblack-5" htmlFor={name}>
//         {label} <sup className="text-pink-200">*</sup>
//       </label>
//       {/* Render the chips and input */}
//       <div className="flex w-full flex-wrap gap-y-2">
//         {/* Map over the chips array and render each chip */}

//         {chips.map((chip, index) => (
//           <div
//             key={index}
//             className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
//           >

//             {/* Render the chip value */}
//             {chip}
//             {/* Render the button to delete the chip */}
//             <button
//               type="button"
//               className="ml-2 focus:outline-none"
//               onClick={() => handleDeleteChip(index)}
//             >
//               <GrFormClose className="text-sm" />
//             </button>

//           </div>
//         ))}

//         {/* Render the input for adding new chips */}
//         <input
//           id={name}
//           name={name}
//           type="text"
//           placeholder={placeholder}
//           onKeyDown={handleKeyDown}
//           className="form-style w-full"
//         />
//       </div>

//       {/* Render an error message if the input is required and not filled */}
//       {errors[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
// }

// export default ChipInput

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [tag, setTag] = useState("");
  const [taglist, setTagList] = useState([]);
  const { course, editCourse } = useSelector((state) => state.course);

  useEffect(() => {
    if (editCourse) {
      // console.log("In requirements field, 1st render, editCourse=true course is",course)
      setTagList(JSON.parse(course?.tags));
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, taglist);
  }, [taglist]);

  const changeHandler = (event) => {
    event.preventDefault();
    setTag(event.target.value);
  };

  const keyHandler = (event) => {
    // console.log("e........", event.target.value);
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      // console.log("Enter Click Hua hai");
      setTagList([...taglist, tag]);
      setTag("");
      // console.log("taglist",taglist);
    }
  };
  const deleteHandler = (event, index) => {
    event.preventDefault();
    // console.log("index", index);
    const dummyList = [...taglist];
    dummyList.splice(index, 1);
    console.log("dummyList", dummyList);
    setTagList([...dummyList]);
  };
  // console.log("taglist",taglist);

  return (
    <div>
      <label className="flex flex-col gap-2">
        {" "}
        <p className="text-[14px] text-richblack-200">
          {label} <sup className=" text-pink-400">*</sup>
        </p>
        {taglist?.length > 0 && (
          <div className="flex gap-2 text-black w-full flex-wrap">
            {taglist?.map((value, index) => (
              // console.log("value",value)
              <div
                key={index}
                className="bg-yellow-100 rounded-lg px-1 flex justify-center gap-2 items-center"
              >
                <span className="text-black">{value}</span>
                <button
                  onClick={(event) => {
                    deleteHandler(event, index);
                  }}
                >
                  <RxCross2></RxCross2>
                </button>
              </div>
            ))}
          </div>
        )}
        <div>
          <input
            type="text"
            name={name}
            value={tag}
            placeholder={placeholder}
            onChange={changeHandler}
            onKeyDown={keyHandler}
            className="px-5 w-full outline-none rounded-lg bg-richblack-700 h-10 border-b border-b-richblack-500"
          ></input>
        </div>
      </label>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};
export default ChipInput;
