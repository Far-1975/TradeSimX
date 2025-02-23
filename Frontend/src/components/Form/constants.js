export const constants = {

  indicators: [
    { id: 'open', name: 'Open Price', params: ['period', 'type'] },
    { id: 'high', name: 'High Price', params: ['period'] },
    { id: 'low', name: 'Low Price', params: ['fastPeriod', 'slowPeriod', 'signalPeriod'] },
    { id: 'close', name: 'Close Price', params: ['period', 'stdDev'] },
    { id: 'volume', name: 'Volume', params: ['period'] },
    { id: 'sma_20', name: 'SMA 20', params: ['kPeriod', 'dPeriod', 'smooth'] },
    { id: 'sma_50', name: 'SMA 50', params: ['kPeriod', 'dPeriod', 'smooth'] },
    { id: 'volume_sma_5', name: 'Volume SMA 5', params: ['kPeriod', 'dPeriod', 'smooth'] },
    { id: 'volume_ma_20', name: 'Volume SMA 20', params: ['kPeriod', 'dPeriod', 'smooth'] },
    { id: 'tr', name: 'True Range', params: ['kPeriod', 'dPeriod', 'smooth'] },
    { id: 'atr', name: 'Average True Range', params: ['kPeriod', 'dPeriod', 'smooth'] },
    { id: 'rsi', name: 'Relative Strength Index', params: ['kPeriod', 'dPeriod', 'smooth'] },
    { id: 'candle_return', name: 'Candle Return', params: ['kPeriod', 'dPeriod', 'smooth'] }
  ],

  comparisonOperators: [
    { value: 'crosses_above', label: 'Crosses Above' },
    { value: 'crosses_below', label: 'Crosses Below' },
    { value: 'greater_than_equal_to', label: 'Greater Than Equal To' },
    { value: 'less_than_equal_to', label: 'Less Than Equal To' },
    { value: 'equals', label: 'Equals' }
  ],

  arithmeticOperators: [
    { value: '+', label: 'Add (+)' },
    { value: '-', label: 'Subtract (-)' },
    { value: '*', label: 'Multiply (×)' },
    { value: '/', label: 'Divide (÷)' },
  ]
}; 