import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Piechart = () => {
  const [chartData, setChartData] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  });

  useEffect(() => {
    fetchJobData();
  }, []);

  const fetchJobData = () => {
    axios.get('http://localhost:3001/hires')
      .then(response => {
        const hiresData = response.data;
        const labels = [];
        const series = [];

        hiresData.forEach(item => {
          labels.push(item.job);
          series.push(item.count);
        });

      
        setChartData({
          series: series,
          options: {
            ...chartData.options,
            labels: labels
          }
        });
      })
      .catch(error => {
        console.error('Error fetching job data:', error);
      });
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={380} />
      </div>
    </div>
  );
};

export default Piechart;
