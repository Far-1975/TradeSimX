import React from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function StreakMetrics({ streakMetrics }) {
  const barChartData = {
    labels: ['Winning Streak', 'Losing Streak'],
    datasets: [
      {
        data: [streakMetrics.max_winning_streak, streakMetrics.max_losing_streak],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)', // green for winning
          'rgba(239, 68, 68, 0.8)', // red for losing
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 40,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        callbacks: {
          label: function(context) {
            return `${context.raw} trades`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Trading Streaks</h2>
        <p className="mt-2 text-gray-600">Maximum Consecutive Wins & Losses</p>
      </div>

      <div className="h-[300px] relative">
        <Bar data={barChartData} options={options} />
      </div>

      {/* Streak Details */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-green-50 p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-green-800">Best Winning Streak</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-4xl font-bold text-green-600">
              {streakMetrics.max_winning_streak}
            </p>
            <p className="ml-2 text-green-600">trades</p>
          </div>
          <p className="mt-1 text-sm text-green-600">
            Consecutive winning trades
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-red-50 p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-red-800">Worst Losing Streak</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-4xl font-bold text-red-600">
              {streakMetrics.max_losing_streak}
            </p>
            <p className="ml-2 text-red-600">trades</p>
          </div>
          <p className="mt-1 text-sm text-red-600">
            Consecutive losing trades
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
} 