import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import JobList from "./pages/joblist";
import Viewapplication from "./pages/viewapplication";
import Login from "./pages/login";
import Userlogin from "./pages/userlogin";
import SignUp from "./pages/signup";
import Fillapplication from "./pages/fillapplication";
import HireList from "./pages/hire";
import Viewapplicationuser from "./pages/viewapplication";





function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/joblist" element={<JobList/>}/>
          <Route path="/viewapplication/:id" element={<Viewapplication />} />
          <Route path="/viewapplicationuser/:id" element={<Viewapplicationuser />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Userlogin />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/fillapplication" element={<Fillapplication />}/>
          <Route path="/hirelist" element={<HireList />}/>
                   
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
