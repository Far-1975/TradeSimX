import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function convertDurationToHours(durationStr) {
  if (!durationStr) return 0;
  
  const timeMap = {
    'd': 24,   // days to hours
    'h': 1,    // hours
    'm': 1/60  // minutes to hours
  };

  // Handle formats like "1h", "20m", "2d"
  const value = parseFloat(durationStr);
  const unit = durationStr.slice(-1).toLowerCase();
  
  return value * (timeMap[unit] || 0);
}

export function DurationProfitScatter({ tradeDetails }) {
  // Add data validation
  if (!tradeDetails || !Array.isArray(tradeDetails) || tradeDetails.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Duration vs Profit Analysis</h2>
          <p className="mt-2 text-gray-600">No trade data available</p>
        </div>
      </motion.div>
    );
  }

  // Prepare data points with validation and duration conversion
  const dataPoints = tradeDetails
    .filter(trade => 
      trade && 
      trade.trade_duration &&
      typeof trade.profit_percentage === 'number' &&
      !isNaN(trade.profit_percentage)
    )
    .map(trade => ({
      x: convertDurationToHours(trade.trade_duration),
      y: trade.profit_percentage,
      isWin: trade.profit_percentage > 0
    }));

  // Validate if we have valid data points
  if (dataPoints.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Duration vs Profit Analysis</h2>
          <p className="mt-2 text-gray-600">No valid trade data available</p>
        </div>
      </motion.div>
    );
  }

  // Calculate statistics with safe operations
  const avgDuration = dataPoints.reduce((acc, point) => acc + point.x, 0) / dataPoints.length || 0;
  const avgProfit = dataPoints.reduce((acc, point) => acc + point.y, 0) / dataPoints.length || 0;
  const maxProfit = Math.max(...dataPoints.map(point => point.y)) || 0;
  const maxDuration = Math.max(...dataPoints.map(point => point.x)) || 0;

  const scatterData = {
    datasets: [
      {
        label: 'Winning Trades',
        data: dataPoints.filter(point => point.isWin),
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Losing Trades',
        data: dataPoints.filter(point => !point.isWin),
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          padding: 20,
          usePointStyle: true,
        },
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
            const point = context.raw;
            const hours = point.x;
            let durationText;
            if (hours >= 24) {
              durationText = `${(hours / 24).toFixed(1)} days`;
            } else if (hours >= 1) {
              durationText = `${hours.toFixed(1)} hours`;
            } else {
              durationText = `${(hours * 60).toFixed(0)} minutes`;
            }
            return [
              `Duration: ${durationText}`,
              `Profit: ${point.y.toFixed(2)}%`
            ];
          }
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Trade Duration (hours)',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
        ticks: {
          callback: function(value) {
            if (value >= 24) {
              return `${(value / 24).toFixed(1)}d`;
            }
            return `${value}h`;
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Profit Percentage (%)',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  };

  const chartOptions = {
    ...options,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
      delay: (context) => context.dataIndex * 50
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="h-[400px]"
        >
          <Scatter data={scatterData} options={chartOptions} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 