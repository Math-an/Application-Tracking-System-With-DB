import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/nav";
import Jobnav from "../components/jobnav";
import { Link } from 'react-router-dom';

function HireList() {
    const [hiredJobs, setHiredJobs] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3001/api/hiredjobs')
        .then(response => {
          console.log("Fetched data:", response.data); // Log fetched data to check the structure
          setHiredJobs(response.data);
        })
        .catch(error => {
          console.error('Error fetching hired job data:', error);
        });
    }, []);

    return (
        <>
          <div className="bg-gray-100 h-full">
            <Nav />
            <Jobnav />
            
            <div className="bg-white h-10 w-full">
              <ul className="flex mt-5 justify-evenly">
                <li className="mt-2 relative right-24">Name</li>
                <li className="mt-2 relative right-32">Job Role</li>
                <li className="mt-2 relative right-24">Qualifications</li>
                <li className="mt-2 relative right-24">Location</li>
                <li className="mt-2">Actions</li>
              </ul>
            </div>
            {hiredJobs && hiredJobs.length > 0 ? (
              hiredJobs.map((job, index) => (
                <div key={index} className="m-3">
                  <div className="mt-5 h-10 w-full bg-white flex">
                    <p className="text-blue-500 font-light mt-2 relative left-16 text-sm">{job.firstName}</p>
                    <p className="text-gray-700 font-light mt-2 text-sm ml-[12rem]">{job.job}</p>
                    <p className="text-gray-700 font-light mt-2 text-sm ml-[12rem]">{job.qualification}</p>
                    <p className="text-gray-700 font-light mt-2 text-sm ml-[12rem]">{job.state}</p>  
                    <Link to={`/viewapplication/${job._id}`}>
                      <button className="bg-orange-800 h-6 w-16 text-white text-sm text-center mt-2 ml-[16rem] rounded">View</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No hired jobs available</p>
            )}
          </div>
        </>
      );
}

export default HireList;
