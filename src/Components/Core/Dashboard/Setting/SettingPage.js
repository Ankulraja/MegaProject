import ImageUpdate from "./ImageUpdate"
import PasswordInfo from "./PasswordInfo"
import ProfileInfo from "./ProfileInfo"
import DeleteAccount from "./DeleteAccount"

const SettingPage = () => {
  return (
    <div className="text-white">
        <h1 className="text-4xl">Edit Profile</h1>
        <div className="mt-12 border-[0.4px] border-richblack-500 bg-richblack-800 rounded-xl">
            <ImageUpdate></ImageUpdate>
        </div>
        <div className="mt-12 border-[0.4px] border-richblack-500 bg-richblack-800 rounded-xl">
            <ProfileInfo></ProfileInfo>
        </div>
        <div className="mt-36 border-[0.4px] border-richblack-500 bg-richblack-800 rounded-xl">
            <PasswordInfo></PasswordInfo>
        </div>
        <div className="mt-36 border-[0.4px] border-richblack-500 bg-pink-900 rounded-xl">
          <DeleteAccount></DeleteAccount>
        </div>
       
    </div>
  )
}
export default SettingPage