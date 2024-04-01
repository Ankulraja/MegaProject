const Tags = ({img,title,subTitle}) => {
  return (
    <div className="flex flex-row  gap-5" >
        <div className="w-[50px] h-[50px] bg-white rounded-[50%] flex justify-center items-center">
           <img className="w-[30px] h-[30px] rounded-[50%] " src={img}></img>
        </div>
        <div className="flex flex-col">
            <div className="font-bold ">{title}</div>
            <div>{subTitle}</div>
        </div>
    </div>
  )
}
export default Tags