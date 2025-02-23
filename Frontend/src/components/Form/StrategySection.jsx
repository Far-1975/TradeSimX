import React from 'react';

export function StrategySection({ data, onChange, error }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-blue-100">
        <div className="p-2 bg-blue-50 rounded-lg">
          <svg 
            className="w-6 h-6 text-green-600"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-black-900">Strategy Details</h2>
          <p className="text-sm text-gray-600 mt-1">Define your strategy's core information</p>
        </div>
      </div>

      {/* Strategy Name Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-black-700">
          Strategy Name
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className={`
              block w-full px-4 py-3 rounded-lg border
              ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
              shadow-sm transition-colors duration-200
              bg-white
              placeholder-gray-400
              focus:outline-none focus:ring-2
            `}
            placeholder="Enter a unique name for your strategy"
          />
          {error && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Strategy Description Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-black-700">
          Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          rows={4}
          className="
            block w-full px-4 py-3 rounded-lg
            border border-gray-300
            shadow-sm
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-colors duration-200
            bg-white
            placeholder-gray-400
            resize-none
          "
          placeholder="Describe your trading strategy's objectives and methodology..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Provide a clear description of your strategy's goals and approach
        </p>
      </div>

      {/* Tips Section */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
        <h4 className="text-sm font-semibold text-green-800 mb-2">Strategy Tips</h4>
        <ul className="space-y-2 text-sm text-green-700">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Use a descriptive name that reflects the strategy's approach</span>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Include key indicators and timeframes in the description</span>
          </li>
        </ul>
      </div>
    </div>
  );
}