import { Link } from "react-router-dom"
import Highlight from "./Highlight"
import YellowBtn from "./YellowBtn"
import GreyBtn from "./GreyBtn"
import { TypeAnimation } from "react-type-animation"
const CodeBlock = ({position,heading,subHeading,btnYellow,btnGray,bgGradiant,colorCode ,code}) => {
    return (
    <div className={`w-full flex ${position} flex-wrap` }>
        <div className="w-1/2">
            <div className="">
                {heading}
            </div>
            <div className="text-richblack-400 font-bold py-8">{subHeading}</div>
            <div className="flex gap-10">
                <Link><YellowBtn text={btnYellow}></YellowBtn></Link>
                <Link><GreyBtn text={btnGray}></GreyBtn></Link>
            </div>
        </div>


        {/* Part-2 */}
        <div className="w-1/2 flex justify-center">
            <div className="w-4/5 flex border-2 border-richblack-700">
           <div className="w-1/12  text-center  py-2 text-richblack-400">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
           </div>
           <div className={`w-[500px] py-2 px-3 `}>
           <TypeAnimation
            sequence={[code, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              color:"yellow"
            }}
          />
           </div>
           </div>
        </div>
    </div>
  )
}
export default CodeBlock