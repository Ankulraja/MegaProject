import { useSelector } from "react-redux"
import CardWish from './CardWish';
import CardTotal from "./CardTotal";

const Wishlist = () => {
    const {total ,totalItems} = useSelector((state)=> state.cart);

  return (

    <div className="text-white">
    <h1 className="text-white text-3xl">My Wishlist</h1>
    <p className="pt-10 text-richblack-300 w-full border-b-[0.5px] py-2"> {total} Courses in Wishlist</p>
    <div className="w-full flex max-lg:flex-col"> 
        <div className="w-3/4 max-lg:w-full">
            <CardWish></CardWish>
        </div>
        <div className="w-1/4 max-lg:w-1/2">
            <CardTotal></CardTotal>
        </div>
    </div>
    </div>
    
  )
}
export default Wishlist