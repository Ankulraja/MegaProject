import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import SideBar from "../Components/Core/Dashboard/SideBar"

const Dashboard = () => {
  const {loading:authLoading} = useSelector((state)=> state.auth)
  const {loading:profileLoading}= useSelector((state)=> state.profile)

  if(profileLoading || authLoading){
    return (
      <div className="w-full h-full text-center">
        Spinner
      </div>
    )
  }
  return (
    <div className="bg-richblack-900 relative flex min-h-[calc(100vh-3.5rem)]">
      <div className="w-2/12">

      <SideBar></SideBar>
      </div>
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-[1200px] py-10 px-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default Dashboard