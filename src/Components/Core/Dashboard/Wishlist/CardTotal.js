const CardTotal = () => {
  return (
    <div className="w-11/12 mx-auto flex flex-col px-4 gap-1 justify-between py-10 border-[0.5px] border-richblack-500 bg-richblack-800 rounded-lg my-4">
        <p>Total:</p>
        <p className="text-2xl">Rs <span className="text-yellow-200">4,599</span></p>
        <s className="text-richblack-500">Rs. 6,499</s>
        <button className="py-4 px-7 bg-yellow-100 text-black w-9/12 rounded-lg ">Buy Now</button>
    </div>
  )
}
export default CardTotal