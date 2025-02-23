import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  BarChart2, 
  TrendingUp, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  RefreshCw,
  Database
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function StrategyOptimization() {
  const strategies = [
    {
      title: "Walk-Forward Analysis",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "Test your strategy on unseen data to validate its robustness",
      benefits: [
        "Prevents curve fitting",
        "Tests strategy adaptability",
        "More realistic results"
      ],
      color: "blue"
    },
    {
      title: "Monte Carlo Simulation",
      icon: <RefreshCw className="w-6 h-6" />,
      description: "Simulate thousands of possible market scenarios",
      benefits: [
        "Risk assessment",
        "Probability distribution",
        "Stress testing"
      ],
      color: "purple"
    },
    {
      title: "Parameter Optimization",
      icon: <Settings className="w-6 h-6" />,
      description: "Find the best parameters for your trading strategy",
      benefits: [
        "Grid search",
        "Genetic algorithms",
        "Machine learning optimization"
      ],
      color: "green"
    }
  ];

  const optimizationTips = [
    {
      title: "Avoid Overfitting",
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      description: "Ensure your strategy performs well on unseen data by using proper validation techniques."
    },
    {
      title: "Use Multiple Timeframes",
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      description: "Test your strategy across different timeframes to ensure consistency."
    },
    {
      title: "Consider Transaction Costs",
      icon: <Database className="w-6 h-6 text-purple-500" />,
      description: "Include realistic trading fees and slippage in your backtests."
    },
    {
      title: "Performance Metrics",
      icon: <BarChart2 className="w-6 h-6 text-green-500" />,
      description: "Look beyond just profit/loss. Consider Sharpe ratio, drawdown, and other metrics."
    }
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
                Strategy Optimization & Backtesting
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn how to optimize and validate your trading strategies using advanced backtesting techniques
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Backtesting Strategies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {strategies.map((strategy, index) => (
                <StrategyCard key={index} {...strategy} />
              ))}
            </div>

            {/* Process Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-16"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Optimization Process
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <ProcessStep
                  number="01"
                  title="Data Collection"
                  description="Gather high-quality historical data for testing"
                />
                <ProcessStep
                  number="02"
                  title="Initial Testing"
                  description="Run preliminary backtests to establish baseline performance"
                />
                <ProcessStep
                  number="03"
                  title="Optimization"
                  description="Fine-tune parameters and rules for better results"
                />
                <ProcessStep
                  number="04"
                  title="Validation"
                  description="Verify strategy performance on out-of-sample data"
                />
              </div>
            </motion.div>

            {/* Optimization Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {optimizationTips.map((tip, index) => (
                <OptimizationTip key={index} {...tip} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Optimize Your Strategy?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Use our advanced backtesting tools to improve your trading performance
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Start Backtesting Now
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

function StrategyCard({ title, icon, description, benefits, color }) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colors[color]} flex items-center justify-center text-white mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <motion.li
            key={benefit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <CheckCircle className="w-5 h-5 text-green-500" />
            {benefit}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProcessStep({ number, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="text-5xl font-bold text-blue-100 mb-4">{number}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function OptimizationTip({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg p-6 flex gap-4"
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
} 