import React, { useState } from "react";
import "../style/login.css";
import { Input } from "antd";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        window.location.href = "/dashboard"; // Redirect to the dashboard
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Email and Password is incorrect");
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className="back"></div>
      <div className="">
        <div className="">
          <form onSubmit={handleFormSubmit} className="mt-[12rem] ml-[12rem]">
            <p className="text-sm mt-5 text-gray-500 font-light">
              Recruiter Login
            </p>
            <Input
              className="w-[20rem] mt-5"
              type="email"
              id="ema"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input.Password
              className="w-[20rem] mt-5"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input.Password>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            <p className="text-blue-500 mt-2 text-sm font-extralight">
              Forgot your Password?
            </p>
            <button
              type="submit"
              className="mt-8 w-[20rem] h-[2rem] rounded-md text-center bg-blue-500 text-white text-sm"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
