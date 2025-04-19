import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ContestGraph = ({ data, title }) => {
  const chartData = {
    labels: data.contests, // e.g., ['Contest 1', 'Contest 2', 'Contest 3']
    datasets: [
      {
        label: 'LeetCode',
        data: data.leetcodeRatings, // e.g., [1700, 1800, 1750]
        borderColor: 'rgba(236, 220, 153, 1)', // Vivid magenta
        backgroundColor: 'rgba(236, 220, 153, 0.2)', // Light magenta
        fill: false,
        tension: 0.3,
      },
      {
        label: 'CodeForces',
        data: data.codeforcesRatings, // e.g., [1500, 1600, 1550]
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'CodeChef',
        data: data.codechefRatings, // e.g., [1400, 1450, 1500]
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'Atcoder',
        data: data.atcoderRatings, // e.g., [1700, 1800, 1750]
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#d1d5db' }, // Light text for dark theme
      },
      title: {
        display: true,
        text: title,
        color: '#d1d5db',
      },
      tooltip: {
        titleColor: '#d1d5db',
        bodyColor: '#d1d5db',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: 'Rating', color: '#d1d5db' },
        ticks: { color: '#d1d5db' },
      },
      x: {
        title: { display: true, text: 'Contest', color: '#d1d5db' },
        ticks: { color: '#d1d5db' },
      },
    },
  };

  return (
    <div className="bg-gray-900 p-4 rounded-2xl w-full max-w-[600px] h-[300px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ContestGraph;