import React from "react";
import { Link } from "react-router-dom";

function Dashboardnav(){
    return(
        <>
         <div className="bg-blue-700 w-full h-12 inner-shadow shadow-md">
        <div className="grid grid-cols-12">
          <div className="col-span-1 bg-blue-500 h-12">
            <p className="text-center text-white mt-3">Dashboard</p>
          </div>
       <Link to={"/joblist"}>  <div className="col-span-1 hover:bg-blue-500 hover:inner-shadow">
            <p className="text-center mt-3 text-white ">Jobs</p>
          </div> </Link>
          <div className="col-span-1">
         <Link to={"/fillapplication"}>   <p className="text-center mt-3 text-white ">Jobs Add </p></Link>
          </div>
        </div>
             </div>
        </>
    )
}

export default Dashboardnav;