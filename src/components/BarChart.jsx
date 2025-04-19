import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ totalQuestions, dsaQuestions, cpQuestions }) => {
  const chartData = {
    labels: ['Total', 'DSA', 'CP'],
    datasets: [
      {
        data: [totalQuestions, dsaQuestions, cpQuestions],
        backgroundColor: [
          'rgba(163, 255, 174, 0.8)', 
          '	rgba(87, 199, 255, 0.8)', 
          '	rgba(138, 110, 255, 0.8)', 
        ],
        borderColor: [
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
            display:false,
      },
      title: {
        display: true,
          text: 'Coding Stats',
           color:'#ffffff'
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
          },
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
            text: 'Problems',
            color: '#ffffff',
        },
        ticks: {
            color: '#ffffff', // Change this for y-axis ticks
        },
      },
      x: {
        title: {
          display: true,
          text: 'Category',
          color:'#ffffff'
        },
        ticks: {
        color: '#ffffff', // Change this for y-axis ticks
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl w-full max-w-[300px] h-[200px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;