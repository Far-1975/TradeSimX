import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const intervals = [
  { value: '1m', label: '1 Minute' },
  { value: '5m', label: '5 Minutes' },
  { value: '15m', label: '15 Minutes' },
  { value: '1h', label: '1 Hour' },
  { value: '1d', label: '1 Day' },
];

export function TimeframeSection({ data, onChange }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md border border-gray-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex items-center gap-2 mb-6"
        variants={itemVariants}
      >
        <Clock className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-900">Timeframe Selection</h2>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <div className="relative">
            <motion.input
              type="date"
              id="startDate"
              value={data.startDate}
              onChange={(e) => onChange({ ...data, startDate: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 py-2 px-3"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <div className="relative">
            <motion.input
              type="date"
              id="endDate"
              value={data.endDate}
              onChange={(e) => onChange({ ...data, endDate: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 py-2 px-3"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="interval" className="block text-sm font-medium text-gray-700 mb-2">
            Interval
          </label>
          <motion.select
            id="interval"
            value={data.interval}
            onChange={(e) => onChange({ ...data, interval: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 py-2 px-3"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {intervals.map((interval) => (
              <option key={interval.value} value={interval.value}>
                {interval.label}
              </option>
            ))}
          </motion.select>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
