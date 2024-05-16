import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaBarsProgress } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import SubSectionCard from "./SubSectionCard";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../Service/Operation/Course";
import { setCourse } from "../../../../../Slices/courseSlice";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../../Common/ConfirmationModal";
const NestedView = ({ handleChangeEditSection }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [ConfirmationModalData, setConfirmationModalData] = useState(null);
  // console.log("nestes view me Courses........................",course);
  const deleteSectionHandler = async (sectionId) => {
    const data = {
      sectionId: sectionId,
      courseId: course._id,
    };
    // const data = course.courseContent._id;
    const toastId = toast.loading("Deleting...");
    console.log("data", data);
    const result = await deleteSection(data, token);
    console.log("result ", result);
    if (result) {
      localStorage.setItem("course", JSON.stringify(result));
      dispatch(setCourse(result));
    }
    setConfirmationModalData(null);
    toast.dismiss(toastId);
  };

  const deleteSubSectionHandler = async (subSectionId, sectionId) => {
    const data = {
      subSectionId: subSectionId,
      sectionId: sectionId,
    };
    // const data = course.courseContent._id;
    const toastId = toast.loading("Deleting...");
    console.log("data", data);
    const result = await deleteSubSection(data, token);
    console.log("result ", result);
    if (result) {
      const updatedCourseContent = course?.courseContent?.map((section) => {
        return section._id === sectionId ? result : section;
      });
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      localStorage.setItem("course", JSON.stringify(updatedCourse));
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModalData(null);
    toast.dismiss(toastId);
  };
  return (
    <div>
      {course?.courseContent?.map((section) => (
        <details key={section._id} open>
          <summary className="flex border-b border-richblack-100 py-2 justify-between items-center text-richblack-200">
            <div className="flex justify-center items-center gap-3">
              <p>
                <FaBarsProgress></FaBarsProgress>
              </p>
              <h2 className="text-richblack-25"> {section.sectionName}</h2>
            </div>

            <div className="text-xl flex gap-4">
              <button
                onClick={() => {
                  handleChangeEditSection(section._id, section.sectionName);
                }}
                className="text-richblack-300"
              >
                <MdOutlineModeEditOutline></MdOutlineModeEditOutline>
              </button>
              <button
                onClick={() => {
                  setConfirmationModalData({
                    text1: "Are you sure to Delete Section",
                    text2:
                      "After deleting you loss all the data of this section",
                    btn1Text: "Delete",
                    btn2Text: "Cancle",
                    btn1Handler: () => {
                      deleteSectionHandler(section._id);
                    },
                    btn2Handler: () => {
                      setConfirmationModalData(null);
                    },
                  });
                }}
                className="text-richblack-300"
              >
                <MdDelete></MdDelete>
              </button>
              <div className="border-[0.5px]"></div>
              <button className="text-richblack-300">
                <IoMdArrowDropdown></IoMdArrowDropdown>
              </button>
            </div>
          </summary>

          {/* Sub-Section */}
          {/* {console.log("Ha Render hua")} */}
          {section?.subSection?.length > 0 &&
            section?.subSection.map((value) => (
              <div className="flex justify-between py-2  ml-5 pl-3 border-b-[0.1px] border-richblack-100">
                <div
                  onClick={() => {
                    setViewSubSection({
                      title: value.title,
                      description: value.description,
                      videoUrl: value.videoUrl,
                    });
                  }}
                  className="flex w-full cursor-pointer justify-start items-center gap-3"
                >
                  <p>
                    <FaBarsProgress></FaBarsProgress>
                  </p>
                  <h2 className="text-richblack-200 text-[14px] ">
                    {" "}
                    {value.title}
                  </h2>
                </div>

                <div className="text-xl flex gap-4">
                  <button
                    onClick={() => {
                      setEditSubSection({
                        title: value.title,
                        description: value.description,
                        videoUrl: value.videoUrl,
                        subSectionId: value._id,
                        sectionId: section._id,
                      });
                    }}
                    className="text-richblack-300"
                  >
                    <MdOutlineModeEditOutline></MdOutlineModeEditOutline>
                  </button>
                  <button
                    onClick={() => {
                      setConfirmationModalData({
                        text1: "Are you sure to Delete SubSection",
                        text2:
                          "After deleting you loss all the data of this SubSection",
                        btn1Text: "Delete",
                        btn2Text: "Cancle",
                        btn1Handler: () => {
                          deleteSubSectionHandler(value._id, section._id);
                        },
                        btn2Handler: () => {
                          setConfirmationModalData(null);
                        },
                      });
                    }}
                    className="text-richblack-300"
                  >
                    <MdDelete></MdDelete>
                  </button>
                </div>
              </div>
            ))}

          <button
            onClick={() => {
              setAddSubSection(section._id);
            }}
            className="flex gap-1 px-5 justify-center items-center text-yellow-100"
          >
            <span className="text-xl  text-yellow-100 font-bold py-5">
              <MdAdd></MdAdd>{" "}
            </span>
            <p>Add Lecture</p>
          </button>
        </details>
      ))}
      {addSubSection ? (
        <SubSectionCard
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        ></SubSectionCard>
      ) : viewSubSection ? (
        <SubSectionCard
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        ></SubSectionCard>
      ) : editSubSection ? (
        <SubSectionCard
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        ></SubSectionCard>
      ) : (
        <div></div>
      )}
      {ConfirmationModalData && (
        <ConfirmationModal
          modalData={ConfirmationModalData}
        ></ConfirmationModal>
      )}
    </div>
  );
};
export default NestedView;
