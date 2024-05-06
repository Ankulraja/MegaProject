import ReactStars from 'react-stars'
import reportWebVitals from '../../../../reportWebVitals';
import EditBtn from '../EditBtn';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../../Slices/cartSlice';
const CardWish = () => {
    const dispatch =useDispatch();
  return (
    <div className="flex py-5">
        <div className="w-1/4  ">
            <img className="w-60 h-40 rounded-lg " alt="..."
            src="https://assets-global.website-files.com/6344c9cef89d6f2270a38908/65725709c91402ab52b1c2b9_Best%207%2B%20Coding%20Languages%20for%20a%20SaaS%20Tech%20Stack%202023%20Guide-p-1080.webp"> 
            </img>
        </div>
        <div className="w-2/4 px-5 flex flex-col justify-between pb-10">
            <h1 className="text-lg">The Complete Python Course and Bootcamp from Zero to Heoo in Python</h1>
            <p className="text-richblack-500">Name</p>
            <div className="flex gap-2">
                <p>4.5</p>
                <p> <ReactStars edit={false} size={"18px"} value={4.5}></ReactStars> </p>
                <p>Review Lenght</p>
            </div>
        </div>
        <div className="w-1/4">
            <button onClick={()=> dispatch(removeFromCart())} className='py-3 px-5 bg-richblack-800 rounded-xl border-[0.1px] border-richblack-600 text-pink-200 text-lg'>Remove</button>
            <p className='text-2xl'>Rs. <span className='text-yellow-100'>1,999</span></p>
        </div>
    </div>
  )
}
export default CardWish