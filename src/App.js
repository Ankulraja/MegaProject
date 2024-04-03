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
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About></About>} ></Route>
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
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </div>
  );
}

export default App;
