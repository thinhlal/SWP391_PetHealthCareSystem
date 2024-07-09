import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axiosInstance from '../../../utils/axiosInstance';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const RevenueLineChart = () => {
  const [revenueData, setRevenueData] = useState(Array(12).fill(0));
  const [canceledData, setCanceledData] = useState(Array(12).fill(0));

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/admin/getRevenueOfEachMonth`,
        );
        const data = response.data;
        const formattedRevenueData = Array(12).fill(0);
        const formattedCanceledData = Array(12).fill(0);
        data.forEach(item => {
          formattedRevenueData[item.month - 1] = item.totalRevenue;
          formattedCanceledData[item.month - 1] = item.canceledCount;
        });

        setRevenueData(formattedRevenueData);
        setCanceledData(formattedCanceledData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRevenue();
  }, []);

  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        tension: 0.35,
      },
      {
        label: 'Canceled Bookings',
        data: canceledData,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue and Canceled Bookings Data for 12 Months',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (context.dataset.label === 'Revenue') {
                label += `$${context.parsed.y}`;
              } else {
                label += context.parsed.y;
              }
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
        suggestedMax: 500,
      },
    },
  };

  return (
    <div
      style={{
        width: '1200px',
        height: '650px',
        margin: '0 auto',
        padding: '30px 0',
      }}
    >
      <Line
        data={data}
        options={options}
      />
    </div>
  );
};

export default RevenueLineChart;
