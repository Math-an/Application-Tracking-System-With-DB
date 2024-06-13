import React from "react";
import "../style/login.css";
import { Input } from "antd";
import { Link } from "react-router-dom";

function Userlogin(){
    return(
        <>
          <div className="grid grid-cols-2">
       <div className="back">

       </div>

       <div className="">

        <div className="">
            <img></img>
            <form  className="mt-[12rem]  ml-[12rem] ">
            <p className="text-sm mt-5 text-gray-500 font-light">User Login</p>
            <Input className="w-[20rem] mt-5" type="email" id="ema" placeholder="Email"></Input>
            <Input.Password className="w-[20rem] mt-5" placeholder="Password"></Input.Password>
            <p className="text-blue-500 mt-5 text-sm font-extralight"> Forget your Passowrd ?</p>
            <button type="submit" className=" mt-8 w-[20rem] h-[2rem] rounded-md text-center bg-blue-500 text-white text-sm ">Login</button>
                <p className="text-black w-[20rem] mt-5 text-sm font-light">Did'nt have an Account</p>
        <Link to={"/SignUp"}><p className="text-blue-500 relative bottom-5 left-[150px] text-sm font-light">Sign Up</p></Link>
            
            </form>
        </div>

       </div>


        </div>
        </>
    )
}

export default Userlogin;