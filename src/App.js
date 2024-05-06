import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { Signup } from "./Pages/Signup";
import Login from "./Pages/Login";
import VerifyEmail from "./Pages/VerifyEmail";
import Navbar from "./Components/Common/NavBar";
import Error from "./Pages/Error";
import ForgetPassword from "./Pages/ForgetPassword";
import Dashboard from "./Pages/Dashboard";
import UpdatePassword from "./Pages/UpdatePassword";
import OpenRoute from "./Components/Core/Auth/OpenRoute";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import SettingPage from "./Components/Core/Dashboard/Setting/SettingPage";
import Enroll from "./Components/Core/Dashboard/EnrolledCourse/Enroll";
import Wishlist from "./Components/Core/Dashboard/Wishlist/Wishlist";
import { useSelector } from "react-redux";
import MyCourse from "./Components/Core/Dashboard/MyCourse/MyCourse";
import AddCourse from "./Components/Core/Dashboard/AddCourse/AddCourse";
function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup></Signup>
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login></Login>
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail></VerifyEmail>
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/forgotPassword"
          element={
            <OpenRoute>
              <ForgetPassword></ForgetPassword>
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword></UpdatePassword>
            </OpenRoute>
          }
        ></Route>
        <Route
          element={
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard/my-profile"
            element={<MyProfile></MyProfile>}
          ></Route>

          <Route
            path="/dashboard/purchase-history"
            // element={}
          ></Route>
          <Route
            path="/dashboard/setting"
            element={<SettingPage></SettingPage>}
          ></Route>
          {user?.accountType === "Student" && (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<Enroll></Enroll>}
              ></Route>
              <Route
                path="/dashboard/wishlist"
                element={<Wishlist></Wishlist>}
              ></Route>
            </>
          )}
          {user?.accountType === "Instructor" && (
            <>
              <Route
                path="/dashboard/my-courses"
                element={<MyCourse></MyCourse>}
              ></Route>
              <Route
                path="/dashboard/add-course"
                element={<AddCourse></AddCourse>}
              ></Route>
            </>
          )}
        </Route>

        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </div>
  );
}

export default App;
