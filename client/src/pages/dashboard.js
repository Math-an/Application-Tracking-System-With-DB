import React, { useState, useEffect } from "react";
import axios from 'axios';
import Nav from "../components/nav";
import ReactApexChart from "react-apexcharts";

import Dashboardnav from "../components/dashboardnav";
import { Link } from 'react-router-dom';

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        title: {
          text: 'Count'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " times";
          }
        }
      }
    }
  });

  useEffect(() => {
    fetchJobData();
  }, []);

  const fetchJobData = () => {
    axios.get('http://localhost:3001/applications')
      .then(response => {
        const jobData = response.data;
        const categories = [];
        const seriesData = [];
  
        
        const jobCountsByDate = {};
  
      
        jobData.forEach(job => {
          const date = new Date(job.timestamp).toLocaleDateString();
          if (!jobCountsByDate[date]) {
            jobCountsByDate[date] = {};
          }
          if (!jobCountsByDate[date][job.job]) {
            jobCountsByDate[date][job.job] = 0;
          }
          jobCountsByDate[date][job.job]++;
        });
  
      
        Object.keys(jobCountsByDate).forEach(date => {
          categories.push(date);
          Object.keys(jobCountsByDate[date]).forEach(job => {
            const index = seriesData.findIndex(item => item.name === job);
            if (index !== -1) {
              seriesData[index].data.push(jobCountsByDate[date][job]);
            } else {
              seriesData.push({
                name: job,
                data: [jobCountsByDate[date][job]]
              });
            }
          });
        });
  
      
        setChartData(prevChartData => ({
          ...prevChartData,
          series: seriesData,
          options: {
            ...prevChartData.options,
            xaxis: {
              ...prevChartData.options.xaxis,
              categories: categories
            }
          }
        }));
      })
      .catch(error => {
        console.error('Error fetching job data:', error);
      });
  };
  
  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

function Dashboard() {
  return (
    <>
      <div className="bg-gray-100">
        <Nav />
        <Dashboardnav />

        <div className="grid grid-cols-12 ">
          <div className="col-span-9"></div>
          <div className="col-span-3"></div>
        </div>
        <div className="grid grid-cols-12 mt-10 max-sm:grid-cols-1">
          <div className="col-span-6 rounded-md bg-white ml-5">
            <ApexChart className="rounded-md" />
          </div>

          <div className="col-span-6">
            <div className="grid grid-cols-2 ml-[8rem] mt-[3rem]">
             <Link to={"/joblist"}> <div className="bg-pink-500 h-[5rem] w-[10rem] rounded-lg">
                <div className="grid grid-cols-3">
                  <div className=" mt-4 col-span-2">
                    <p className="text-center text-white text-2xl font-bold ">20</p>
              
                  </div>
                  <div>
                  <p className="mt-2 font-light relative right-2 top-2 text-white text-md">Open Jobs</p>
                  </div>
                </div>
              </div></Link>
            <Link to={"/hirelist"}>  <div className="bg-blue-500 h-[5rem] w-[10rem] rounded-lg">
                <div className="grid grid-cols-3">
                  <div className=" mt-4 col-span-2">
                    <p className="text-center text-white text-2xl font-bold ">20</p>
                  
                  </div>
                  <div className="col-span-1">
                    <p className="mt-2 font-light relative right-2 top-2 text-white text-md">Hired Jobs</p>

                  </div>
                </div>
              </div></Link>
            </div>
            <div className="grid grid-cols-2 ml-[8rem] mt-[3rem]">
              <div className="bg-amber-500 h-[5rem] w-[10rem] rounded-lg"></div>
              <div className="bg-green-500 h-[5rem] w-[10rem] rounded-lg"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-10 max-sm:grid-cols-1">
          <div className="col-span-6 rounded-lg bg-white ml-5">
            
          </div>
          <div className="col-span-6 rounded-lg flex  justify-center ml-5">
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
