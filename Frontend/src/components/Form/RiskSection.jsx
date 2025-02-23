import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function RiskSection({ data, onChange, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: parseFloat(value) || value
    });
  };

  const cardVariants = {
    hover: { 
      y: -5, 
      boxShadow: '0 10px 30px -15px rgba(0,0,0,0.1)',
      transition: { duration: 0.2 } 
    }
  };

  return (
    <div className="space-y-8">
      {/* Basic Risk Parameters */}
      <div>
        <h3 className="text-lg font-semibold text-pink-800 mb-4">Basic Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-gradient-to-br from-red-200 to-white p-6 rounded-xl shadow-md border border-red-100/50"
            whileHover="hover"
            variants={cardVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-200 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <label className="text-sm font-medium text-black-800">
                  Stop Loss
                </label>
                <p className="text-xs text-gray-500">Set maximum loss limit</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                name="stopLoss"
                value={data.stopLoss}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                  errors?.stopLoss ? 'border-red-300' : 'border-gray-300'
                }`}
                step="0.01"
                placeholder="Enter percentage"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
            </div>
            {errors?.stopLoss && (
              <p className="mt-1 text-xs text-red-600">{errors.stopLoss}</p>
            )}
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-green-200 to-white p-6 rounded-xl shadow-md border border-green-100/50"
            whileHover="hover"
            variants={cardVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <label className="text-sm font-medium text-black-800">
                  Take Profit
                </label>
                <p className="text-xs text-gray-500">Set profit target</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                name="takeProfit"
                value={data.takeProfit}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors?.takeProfit ? 'border-red-300' : 'border-gray-300'
                }`}
                step="0.01"
                placeholder="Enter percentage"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
            </div>
            {errors?.takeProfit && (
              <p className="mt-1 text-xs text-red-600">{errors.takeProfit}</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Trailing Parameters */}
      <div>
        <h3 className="text-lg font-semibold text-pink-800 mb-4">Trailing Parameters</h3>
        <div className="space-y-6">
          {/* Trailing Stop Loss */}
          <motion.div 
            className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-md border border-orange-100/50"
            whileHover="hover"
            variants={cardVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ArrowDownRight className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <label className="text-sm font-medium text-black-800">
                  Trailing Stop Loss
                </label>
                <p className="text-xs text-gray-500">Dynamic loss protection</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Start After
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="trailStart"
                    value={data.trailStart}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 border-gray-300"
                    step="0.01"
                    placeholder="Enter percentage"
                  />
                  <span className="absolute right-11 top-1/2 -translate-y-1/2 text-sm text-gray-500">% Profit</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Trail By
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="trailBy"
                    value={data.trailBy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 border-gray-300"
                    step="0.01"
                    placeholder="Enter percentage"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trailing Take Profit */}
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md border border-black-100"
            whileHover="hover"
            variants={cardVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <label className="text-sm font-medium text-black-800">
                  Trailing Take Profit
                </label>
                <p className="text-xs text-gray-500">Dynamic profit targeting</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Start After
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="takeProfitTrailStart"
                    value={data.takeProfitTrailStart}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    step="0.01"
                    placeholder="Enter percentage"
                  />
                  <span className="absolute right-11 top-1/2 -translate-y-1/2 text-sm text-gray-500">% Profit</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Trail By
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="takeProfitTrailBy"
                    value={data.takeProfitTrailBy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    step="0.01"
                    placeholder="Enter percentage"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}