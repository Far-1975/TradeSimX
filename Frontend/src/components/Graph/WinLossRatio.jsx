import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

export function WinLossRatio({ winningTrades, losingTrades }) {
  const chartData = {
    labels: ['Winning Trades', 'Losing Trades'],
    datasets: [
      {
        data: [winningTrades, losingTrades],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = winningTrades + losingTrades;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
  };

  const chartOptions = {
    ...options,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeInOutQuart'
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
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[400px]"
        >
          <Doughnut data={chartData} options={chartOptions} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function StatsCard({ type, trades, total, winningTrades, losingTrades, delay }) {
  const getCardContent = () => {
    switch (type) {
      case 'winning':
        return {
          className: 'bg-green-50',
          titleColor: 'text-green-800',
          valueColor: 'text-green-600',
          title: 'Winning Trades',
          value: trades,
          subtext: `${((trades / total) * 100).toFixed(1)}% success rate`
        };
      case 'losing':
        return {
          className: 'bg-red-50',
          titleColor: 'text-red-800',
          valueColor: 'text-red-600',
          title: 'Losing Trades',
          value: trades,
          subtext: `${((trades / total) * 100).toFixed(1)}% loss rate`
        };
      case 'ratio':
        return {
          className: 'bg-blue-50',
          titleColor: 'text-blue-800',
          valueColor: 'text-blue-600',
          title: 'Win/Loss Ratio',
          value: (winningTrades / losingTrades).toFixed(2),
          subtext: `Total trades: ${winningTrades + losingTrades}`
        };
      default:
        return {};
    }
  };

  const content = getCardContent();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`${content.className} p-6 rounded-xl`}
    >
      <h3 className={`text-lg font-semibold ${content.titleColor}`}>{content.title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className={`text-4xl font-bold ${content.valueColor}`}>{content.value}</p>
        {type !== 'ratio' && <p className={`ml-2 ${content.valueColor}`}>trades</p>}
      </div>
      <p className={`mt-1 ${content.valueColor}`}>{content.subtext}</p>
    </motion.div>
  );
} 