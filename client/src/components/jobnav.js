import React from "react";
import { Link } from "react-router-dom";
function Jobnav(){
    return(
        <>
     <div className="bg-blue-700 w-full h-12 ">
  <div className="grid grid-cols-12">
  <Link to={"/dashboard"} >  <div className="col-span-1">
      <p className="text-center text-white mt-3">Dashboard</p>
    </div></Link>
    <div className="col-span-1 h-12  bg-blue-500  inner-shadow shadow-md">
      <p className="text-center mt-3 text-white ">Jobs</p>
    </div>
    <div className="col-span-1">
      <p className="text-center mt-3 text-white ">Jobs Add </p>
    </div>
  </div>
       </div>
        </>
    )
}

export default Jobnav;