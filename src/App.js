import logo from "./logo.svg";
import "./App.css";
import { Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import { Signup } from "./Pages/Signup";
import Login from "./Pages/Login";
import Otp from "./Pages/Otp";
import Navbar from "./Components/Common/NavBar";
import Error from "./Pages/Error";
import ForgetPassword from "./Pages/ForgetPassword";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" ></Route>
          <Route path="/contact"></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/otp" element={<Otp></Otp>}></Route>
          <Route path="/forgotPassword" element={<ForgetPassword></ForgetPassword>}></Route>
          <Route path="*" element={<Error></Error>}></Route>
   
      </Routes>
    </div>
  );
}

export default App;
