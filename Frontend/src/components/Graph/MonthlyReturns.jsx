import React from 'react';
import { Bar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export function MonthlyReturns({ monthlyMetrics }) {
  // Convert object to array format
  const months = Object.keys(monthlyMetrics);
  const returns = months.map(month => monthlyMetrics[month].return);

  const data = {
    labels: months,
    datasets: [
      {
        data: returns,
        backgroundColor: returns.map(value => 
          value >= 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'
        ),
        borderColor: returns.map(value => 
          value >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
        ),
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => `Return: ${context.raw}%`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12
          },
          callback: (value) => `${value}%`
        }
      }
    }
  };

  const chartOptions = {
    ...options,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
      delay: (context) => context.dataIndex * 100
    }
  };

  // Calculate statistics from the converted data
  const totalReturn = returns.reduce((acc, val) => acc + val, 0).toFixed(2);
  const avgMonthlyReturn = (totalReturn / returns.length).toFixed(2);
  const bestMonth = Math.max(...returns).toFixed(2);
  const worstMonth = Math.min(...returns).toFixed(2);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">Monthly Returns</h3>
          </div>
          <div className="text-sm font-medium text-gray-500">
            {months[0]} - {months[months.length - 1]}
          </div>
        </div>

        {/* Statistics Cards with staggered animations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Return', value: `${totalReturn}%`, color: totalReturn >= 0 ? 'text-green-600' : 'text-red-600' },
            { label: 'Avg Monthly', value: `${avgMonthlyReturn}%`, color: avgMonthlyReturn >= 0 ? 'text-green-600' : 'text-red-600' },
            { label: 'Best Month', value: `${bestMonth}%`, color: 'text-green-600' },
            { label: 'Worst Month', value: `${worstMonth}%`, color: 'text-red-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-blue-50 rounded-lg p-3 border border-blue-100"
            >
              <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart with container animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="h-[400px]"
        >
          <Bar data={data} options={chartOptions} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 