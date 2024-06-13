import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/nav";
import Jobnav from "../components/jobnav";
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobData(); 
  }, []);

  const fetchJobData = () => {
    axios.get('http://localhost:3001/api/applications')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching job data:', error);
      });
  };

  const handleHire = (jobId) => {
    axios.post('http://localhost:3001/api/hire', { id: jobId })
      .then(response => {
        console.log(response.data.message);
        setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
      })
      .catch(error => {
        console.error('Error hiring:', error);
      });
  };

  const handleReject = (jobId) => {
    axios.delete(`http://localhost:3001/api/reject/${jobId}`)
      .then(response => {
        console.log(response.data.message);
        setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
      })
      .catch(error => {
        console.error('Error rejecting job:', error);
      });
  };


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
        {jobs.map((job, index) => (
          <div key={index} className="m-3">
            <div className="mt-5 h-10 w-full bg-white flex">
              <p className="text-blue-500 font-light mt-2 relative left-16 text-sm">{job.firstName}</p>
              <p className="text-gray-700 font-light mt-2 text-sm ml-[12rem]">{job.job}</p>
              <p className="text-gray-700 font-light mt-2 text-sm ml-[12rem]">{job.qualification}</p>
              <p className="text-gray-700 font-light mt-2 text-sm ml-[12rem]">{job.state}</p>
              <button onClick={() => handleHire(job._id)} className="bg-green-600 h-6 w-16 text-white text-sm text-center relative mt-2 left-44 rounded">Hire</button>
              <button onClick={() => handleReject(job._id)} className="bg-red-500 h-6 w-16 text-white text-sm text-center mt-2 relative left-48 rounded">Reject</button>
              <Link to={`/viewapplication/${job._id}`}>
                <button className="bg-orange-800 h-6 w-16 text-white text-sm text-center mt-2 ml-52 rounded">View</button>
              </Link>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <Pagination simple defaultCurrent={1} total={50} />
        </div>
      </div>
    </>
  );
}

export default JobList;
