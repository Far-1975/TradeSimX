import React from 'react';
import { motion } from 'framer-motion';

export function CustomIndicatorModal({ 
  showModal, 
  onClose, 
  customIndicator, 
  setCustomIndicator, 
  onCreateIndicator,
  indicators,
  arithmeticOperators 
}) {
  if (!showModal) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-xl"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Create Custom Indicator</h3>
        
        <div className="space-y-4 mb-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={customIndicator.name}
              onChange={(e) => setCustomIndicator({
                ...customIndicator,
                name: e.target.value
              })}
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
              placeholder="Enter indicator name"
            />
          </div>

          {/* Calculation Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Calculation
            </label>
            <div className="grid grid-cols-3 gap-3">
              <select
                value={customIndicator.firstIndicator}
                onChange={(e) => setCustomIndicator({
                  ...customIndicator,
                  firstIndicator: e.target.value
                })}
                className="block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
              >
                <option value="">Select Indicator</option>
                {indicators.map(indicator => (
                  <option key={indicator.id} value={indicator.id}>
                    {indicator.name}
                  </option>
                ))}
              </select>

              <select
                value={customIndicator.operator}
                onChange={(e) => setCustomIndicator({
                  ...customIndicator,
                  operator: e.target.value
                })}
                className="block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
              >
                {arithmeticOperators.map(op => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>

              <select
                value={customIndicator.secondIndicator}
                onChange={(e) => setCustomIndicator({
                  ...customIndicator,
                  secondIndicator: e.target.value
                })}
                className="block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
              >
                <option value="">Select Indicator</option>
                {indicators.map(indicator => (
                  <option key={indicator.id} value={indicator.id}>
                    {indicator.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onCreateIndicator}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Create
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
} 