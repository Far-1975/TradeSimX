import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart2,
  PieChart,
  Activity,
  ArrowDown,
  ArrowUp,
  Clock,
  DollarSign,
  Percent,
  AlertCircle,
  TrendingDown,
  Signal,
  BarChart,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function UnderstandingMetrics() {
  const metrics = [
    {
      title: "Win Rate",
      icon: <Percent className="w-6 h-6" />,
      description: "Percentage of profitable trades relative to total trades",
      formula: "(Winning Trades / Total Trades) × 100",
      importance:
        "Indicates strategy's consistency in generating profitable trades",
      example: "A win rate of 60% means 60 out of 100 trades are profitable",
      color: "blue",
    },
    {
      title: "Risk/Reward Ratio",
      icon: <Activity className="w-6 h-6" />,
      description: "Relationship between potential profit and potential loss",
      formula: "Average Win / Average Loss",
      importance:
        "Helps evaluate if the risk taken is worth the potential reward",
      example: "1:2 ratio means potential profit is twice the risk taken",
      color: "green",
    },

    {
      title: "Open Price",
      icon: <DollarSign className="w-6 h-6" />,
      description:
        "The price of the asset at the opening of the trading period.",
      formula: "Opening price of the current period",
      importance:
        "Helps track the initial market sentiment at the beginning of a trading period.",
      example:
        "If the open price of a stock is $100, it means the stock started trading at that price.",
      color: "green",
    },
    {
      title: "High Price",
      icon: <TrendingUp className="w-6 h-6" />,
      description:
        "The highest price reached by the asset during the given period.",
      formula: "Maximum price during the selected period",
      importance:
        "Shows the highest market valuation during the trading period, helping to identify trends.",
      example:
        "A stock with a high price of $120 during a day means it peaked at that price.",
      color: "orange",
    },
    {
      title: "Low Price",
      icon: <TrendingDown className="w-6 h-6" />,
      description:
        "The lowest price reached by the asset during the given period.",
      formula: "Minimum price during the selected period",
      importance:
        "Helps identify potential support levels and areas of buying interest.",
      example:
        "A low price of $80 means the stock dipped to that value during the period.",
      color: "red",
    },
    {
      title: "Close Price",
      icon: <DollarSign className="w-6 h-6" />,
      description: "The price of the asset at the close of the trading period.",
      formula: "Closing price of the current period",
      importance:
        "The most significant price for technical analysis, as it represents the final market consensus.",
      example:
        "If the close price of a stock is $110, it means the last traded price for that period was $110.",
      color: "blue",
    },
    {
      title: "Volume",
      icon: <BarChart className="w-6 h-6" />,
      description:
        "The total number of shares or contracts traded during a period.",
      formula: "Total number of shares/contracts traded in a period",
      importance:
        "Indicates the level of market activity and liquidity. Higher volume generally means more market interest.",
      example:
        "If the volume is 500,000, that means 500,000 shares were traded during that period.",
      color: "purple",
    },
    {
      title: "SMA 20",
      icon: <TrendingUp className="w-6 h-6" />,
      description:
        "The Simple Moving Average (SMA) calculated over the last 20 periods.",
      formula: "Sum of closing prices over 20 periods / 20",
      importance:
        "Used to smooth out price fluctuations and identify market trends over a short-term period.",
      example:
        "If the SMA 20 of a stock is $105, it means the average closing price of the last 20 periods is $105.",
      color: "blue",
    },
    {
      title: "SMA 50",
      icon: <TrendingUp className="w-6 h-6" />,
      description:
        "The Simple Moving Average (SMA) calculated over the last 50 periods.",
      formula: "Sum of closing prices over 50 periods / 50",
      importance:
        "A longer-term moving average that helps identify medium-term trends in the market.",
      example:
        "If the SMA 50 of a stock is $110, it indicates the average closing price over the last 50 periods.",
      color: "green",
    },
    {
      title: "Volume SMA 5",
      icon: <BarChart className="w-6 h-6" />,
      description:
        "The Simple Moving Average of trading volume over the last 5 periods.",
      formula: "Sum of volume over 5 periods / 5",
      importance: "Shows the average market activity over a short-term period.",
      example:
        "A Volume SMA 5 of 400,000 means the average volume over the last 5 periods was 400,000.",
      color: "yellow",
    },
    {
      title: "Volume SMA 20",
      icon: <BarChart className="w-6 h-6" />,
      description:
        "The Simple Moving Average of trading volume over the last 20 periods.",
      formula: "Sum of volume over 20 periods / 20",
      importance:
        "Used to detect trends in trading activity and assess whether the market is gaining or losing interest.",
      example:
        "A Volume SMA 20 of 300,000 means the average volume over the last 20 periods was 300,000.",
      color: "red",
    },
    {
      title: "True Range",
      icon: <ArrowUp className="w-6 h-6" />,
      description:
        "The difference between the highest and lowest price of an asset during a period, including gaps.",
      formula:
        "True Range = max(High - Low, High - Previous Close, Low - Previous Close)",
      importance:
        "Measures the total volatility or price movement of an asset, including gaps.",
      example:
        "If the high is $120, the low is $100, and the previous close was $110, the true range is $20.",
      color: "orange",
    },
    {
      title: "Average True Range (ATR)",
      icon: <ArrowUp className="w-6 h-6" />,
      description: "The average of the true range over a specific period.",
      formula: "ATR = Average of True Ranges over a period",
      importance:
        "Helps gauge the volatility of an asset by smoothing out the true range over multiple periods.",
      example:
        "If the ATR is 15, it means the asset’s price moves, on average, 15 units per period.",
      color: "purple",
    },
    {
      title: "Relative Strength Index (RSI)",
      icon: <Signal className="w-6 h-6" />,
      description:
        "A momentum oscillator that measures the speed and change of price movements.",
      formula: "RSI = 100 - (100 / (1 + RS))",
      importance:
        "Helps identify overbought or oversold conditions in the market, useful for predicting price reversals.",
      example:
        "An RSI above 70 signals an overbought market, while an RSI below 30 indicates an oversold market.",
      color: "green",
    },
    {
      title: "Candle Return",
      icon: <DollarSign className="w-6 h-6" />,
      description:
        "The return from the open to the close of a candlestick, used to gauge price movement during the period.",
      formula: "Candle Return = (Close Price - Open Price) / Open Price",
      importance:
        "Measures the direction and strength of price movement during a single period.",
      example:
        "A candle return of 5% means the price moved 5% higher from the open to the close.",
      color: "blue",
    },
    {
      title: "Maximum Drawdown",
      icon: <ArrowDown className="w-6 h-6" />,
      description: "Largest peak-to-trough decline in account value",
      formula: "((Peak Value - Trough Value) / Peak Value) × 100",
      importance:
        "Measures worst-case scenario and risk management effectiveness",
      example: "30% drawdown means account dropped 30% from its peak",
      color: "red",
    },
    {
      title: "Sharpe Ratio",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "Risk-adjusted return measurement",
      formula: "(Strategy Return - Risk-Free Rate) / Standard Deviation",
      importance: "Evaluates return considering the risk taken",
      example: "Higher ratio indicates better risk-adjusted performance",
      color: "purple",
    },
  ];

  const advancedMetrics = [
    {
      title: "Profit Factor",
      value: "2.5",
      description: "Ratio of gross profit to gross loss",
      trend: "up",
    },
    {
      title: "Average Trade Duration",
      value: "4.2h",
      description: "Mean time trades are held",
      trend: "neutral",
    },
    {
      title: "Recovery Factor",
      value: "3.1",
      description: "Net profit relative to max drawdown",
      trend: "up",
    },
    {
      title: "Expectancy",
      value: "$245",
      description: "Average profit per trade",
      trend: "up",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Understanding Trading Metrics
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Master the key performance indicators that help you evaluate and
                improve your trading strategies
              </p>
            </motion.div>
          </div>
        </section>

        {/* Key Metrics Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Metrics Dashboard */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Advanced Performance Metrics
              </h2>
              <p className="text-lg text-gray-600">
                Deeper insights into your trading performance
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advancedMetrics.map((metric, index) => (
                <AdvancedMetricCard key={index} {...metric} />
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Tips for Using Metrics Effectively
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Consider multiple metrics together for a complete picture",
                      "Track metrics over different timeframes",
                      "Compare metrics against market benchmarks",
                      "Use metrics to identify areas for improvement",
                    ].map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

function MetricCard({
  title,
  icon,
  description,
  formula,
  importance,
  example,
  color,
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-lg ${colors[color]}`}>{icon}</div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-1">
            Description
          </h4>
          <p className="text-gray-600">{description}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Formula</h4>
          <p className="text-gray-600 font-mono bg-gray-50 p-2 rounded">
            {formula}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-1">
            Why It's Important
          </h4>
          <p className="text-gray-600">{importance}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Example</h4>
          <p className="text-gray-600">{example}</p>
        </div>
      </div>
    </motion.div>
  );
}

function AdvancedMetricCard({ title, value, description, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {trend && (
          <span
            className={`text-sm ${
              trend === "up"
                ? "text-green-600"
                : trend === "down"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}
