const Achivement = () => {
    const Stats = [
        {count: "5K", label: "Active Students"},
        {count: "10+", label: "Mentors"},
        {count: "200+", label: "Courses"},
        {count: "50+", label: "Awards"},
    ];
  return (
    <div className="w-8/12 flex flex-row flex-wrap justify-between items-center  mx-auto">
        {
            Stats.map((val,index)=>{
                return(
                    <div key={index} className="text-center py-10  w-[100px] ">
                    <div className="text-3xl font-bold">{val.count} </div>
                    <div className="text-richblack-200"> {val.label}</div>
                    </div>
                )
            })
        } 
    </div>
  )
}
export default Achivement