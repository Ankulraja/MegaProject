import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
const Otp = () => {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 text-white flex justify-center items-center">
      <div className="w-4/12 relative h-[350px] flex flex-col  items-center  ">
        <div className="w-11/12 mx-auto py-10">
          <h1 className="text-3xl font-semibold">Verify Email</h1>
          <p className="text-richblack-200 pt-3">
            A Verification code is send to you. Enter the code below
          </p>
        </div>
        <div className=" ">
          <OtpInput
            // value={otp}
            // onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>&#xA0;&#xA0;&#xA0;&#xA0;</span>}
            renderInput={(props, index) => (
              <input
                {...props}
                placeholder="-"
                style={{ width: "60px", height: "50px" }}
                className="text-4xl rounded-[10px] border-b border-b-richblack-200 text-center  text-white bg-richblack-800"
              />
            )}
          />
          <button
            type="submit"
            // onClick={submitHandler}
            className=" w-full bg-yellow-100  my-8 rounded-lg border text-black border-black bg-orange-500 p-2  text-[1.5xl] font-bold font-sans hover:text-white transition-all duration-200"
          >
            Verify And Register
          </button>
          <div className="flex flex-row justify-between">
          <div className=" bottom-1 left-2 text-white font-sans font-semibold ">
              <Link to={"/login"} className="flex gap-3 items-center hover:underline cursor-pointer">
                <FaArrowLeft></FaArrowLeft>
                Back to login
              </Link>
            </div>
            <div className=" bottom-1 right-2 text-white font-sans font-semibold hover:underline cursor-pointer">
             <Link> Resend OTP</Link>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};
export default Otp;
