import React, { useState } from "react";
import "../style/login.css";
import { Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Destructure form data
    const { firstName, lastName, mobileNumber, email, password, confirmPassword } = formData;

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Send POST request to signup endpoint
      const response = await axios.post("http://localhost:3001/api/signup", {
        firstName,
        lastName,
        mobileNumber,
        email,
        password,
        confirmPassword
      });

      // Check if signup was successful
      if (response.data.success) {
        // Optionally, you can redirect the user to a login page or display a success message
        console.log("Signup successful!");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Signup error:", error.message);
      setError("Error signing up, please try again.");
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className="back"></div>
      <div>
        <div>
          <form onSubmit={handleSubmit} className="mt-[6rem] ml-[10rem]">
            <p className="text-sm mt-5 text-gray-500 font-light">Recruiter Sign Up</p>
            <Input
              className="w-[20rem] mt-5"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              className="w-[20rem] mt-5"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Input
              className="w-[20rem] mt-5"
              type="number"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
            <Input
              className="w-[20rem] mt-5"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input.Password
              className="w-[20rem] mt-5"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
            />
            <Input.Password
              className="w-[20rem] mt-5"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            <p className="text-blue-500 mt-5 text-sm font-extralight">Forget your Password?</p>
            <button
              type="submit"
              className="mt-8 w-[20rem] h-[2rem] rounded-md text-center bg-blue-500 text-white text-sm"
            >
              Sign Up
            </button>
            <div>
              <p className="text-black text-sm font-light">Already have an Account?</p>
              <Link to={"/"}>
                <p className="text-blue-500 text-sm font-light">Login</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
