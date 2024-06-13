import React from "react";

import '../style/common.css';
import { Link } from "react-router-dom";

function Nav(){
    return(
        <>
        <div className="bg-gray-100">
            <div className="bg-white w-full h-13 sticky ">
                <div className="grid grid-cols-12">
                    <div className="col-span-8">
                        <img className="w-16 h-16" alt="logo" src="https://st3.depositphotos.com/43745012/44906/i/450/depositphotos_449066958-stock-photo-financial-accounting-logo-financial-logo.jpg"></img>
                        <p className="text-blue-600 font-serif font-semibold text-xl bottom-5 left-20 absolute">Application Tracking System</p>
                    </div>
                    <div className="col-span-2">
                        <p className="relative top-4 text-gray-700 font-bold  text-xl left-20 font-serif">Welcome Admin</p>
                    </div>
                    <div className="col-span-2">
                     <Link to={"/login"} > <button className="h-8 w-20 relative text-white top-3 left-32 rounded-full bg-blue-800">Logout</button></Link> 

                    </div>
                </div>
                 </div>
    
        </div>
        </>
    )
}
export default Nav;

