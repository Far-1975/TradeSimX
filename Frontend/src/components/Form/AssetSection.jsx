import React from 'react';
import { BarChart3 } from 'lucide-react';

const timeframeOptions = [
  { value: '1m', label: '1 Minute' },
  { value: '3m', label: '3 Minutes' },
  { value: '5m', label: '5 Minutes' },
  { value: '15m', label: '15 Minutes' },
  { value: '30m', label: '30 Minutes' },
  { value: '1h', label: '1 Hour' },
  { value: '2h', label: '2 Hours' },
  { value: '4h', label: '4 Hours' },
  { value: '6h', label: '6 Hours' },
  { value: '8h', label: '8 Hours' },
  { value: '12h', label: '12 Hours' },
  { value: '1d', label: '1 Day' },
  { value: '3d', label: '3 Days' },
  { value: '1w', label: '1 Week' },
  { value: '1M', label: '1 Month' }
];

const symbolOptions = [
  { value: 'BTCUSDT', label: 'Bitcoin (BTCUSDT)', category: 'Popular' },
  { value: 'ETHUSDT', label: 'Ethereum (ETHUSDT)', category: 'Popular' },
  { value: 'BNBUSDT', label: 'Binance Coin (BNBUSDT)', category: 'Popular' },
  { value: 'ADAUSDT', label: 'Cardano (ADAUSDT)', category: 'Altcoins' },
  { value: 'DOGEUSDT', label: 'Dogecoin (DOGEUSDT)', category: 'Altcoins' },
  { value: 'XRPUSDT', label: 'Ripple (XRPUSDT)', category: 'Altcoins' },
  { value: 'SOLUSDT', label: 'Solana (SOLUSDT)', category: 'Altcoins' },
  { value: 'DOTUSDT', label: 'Polkadot (DOTUSDT)', category: 'Altcoins' },
];

export function AssetSection({ data, onChange }) {
  const categories = [...new Set(symbolOptions.map(option => option.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-green-100">
        <div className="p-2 bg-green-50 rounded-lg">
          <BarChart3 className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-black-900">Select Asset</h2>
          <p className="text-sm text-gray-600 mt-1">Choose your trading pair and timeframe</p>
        </div>
      </div>

      {/* Symbol Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-black-700">
          Trading Pair
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          value={data.symbol}
          onChange={(e) => onChange({ ...data, symbol: e.target.value })}
          className="
            block w-full px-4 py-3 rounded-lg
            border border-gray-300
            shadow-sm
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-colors duration-200
            bg-white
          "
        >
          <option value="">Select a trading pair</option>
          {categories.map(category => (
            <optgroup key={category} label={category}>
              {symbolOptions
                .filter(option => option.category === category)
                .map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              }
            </optgroup>
          ))}
        </select>
      </div>

      {/* Timeframe Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-black-700">
          Timeframe
        </label>
        <select
          value={data.timeframe.interval}
          onChange={(e) => onChange({
            ...data,
            timeframe: { ...data.timeframe, interval: e.target.value }
          })}
          className="
            block w-full px-4 py-3 rounded-lg
            border border-gray-300
            shadow-sm
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-colors duration-200
            bg-white
          "
        >
          <option value="">Select timeframe</option>
          <optgroup label="Minutes">
            <option value="1m">1 Minute</option>
            <option value="3m">3 Minutes</option>
            <option value="5m">5 Minutes</option>
            <option value="15m">15 Minutes</option>
            <option value="30m">30 Minutes</option>
          </optgroup>
          <optgroup label="Hours">
            <option value="1h">1 Hour</option>
            <option value="2h">2 Hours</option>
            <option value="4h">4 Hours</option>
            <option value="6h">6 Hours</option>
            <option value="8h">8 Hours</option>
            <option value="12h">12 Hours</option>
          </optgroup>
          <optgroup label="Days & Above">
            <option value="1d">1 Day</option>
            <option value="3d">3 Days</option>
            <option value="1w">1 Week</option>
            <option value="1M">1 Month</option>
          </optgroup>
        </select>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-black-700">Start Date</label>
          <input
            type="date"
            value={data.timeframe.startDate}
            onChange={(e) => onChange({
              ...data,
              timeframe: { ...data.timeframe, startDate: e.target.value }
            })}
            className="
              block w-full px-4 py-3 rounded-lg
              border border-gray-300
              shadow-sm
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-colors duration-200
            "
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-black-700">End Date</label>
          <input
            type="date"
            value={data.timeframe.endDate}
            onChange={(e) => onChange({
              ...data,
              timeframe: { ...data.timeframe, endDate: e.target.value }
            })}
            className="
              block w-full px-4 py-3 rounded-lg
              border border-gray-300
              shadow-sm
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-colors duration-200
            "
          />
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
        <h4 className="text-sm font-semibold text-green-800 mb-2">Trading Tips</h4>
        <ul className="space-y-2 text-sm text-green-700">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Choose a timeframe that matches your strategy's trading style</span>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Ensure sufficient historical data for accurate backtesting</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
