import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  BarChart2,
  Settings,
  BookOpen,
  ChartBar,
  Cog,
  LineChart,
  Zap,
  Target,
  Award,
  Clock,
  Shield,
  CheckCircle,
} from "lucide-react";
import tradingImage from "../assets/trading-chart.jpg";
import tradingImage2 from "../assets/t2.jpg";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import rb1 from "../assets/rb_1.png";
import rb2 from "../assets/rb_2.png";
import rb3 from "../assets/rb_3.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const handleRedirect = () => {
    navigate("/form"); // Replace '/target-route' with your desired path
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const featuredStrategies = [
    {
      name: "Momentum Master",
      author: "Sarah Chen",
      avatar: rb1,
      winRate: 68.5,
      totalReturn: 142.3,
      tradeCount: 234,
      lastMonthReturn: 12.8,
    },
    {
      name: "Trend Warrior",
      author: "Michael Rodriguez",
      avatar: rb2,
      winRate: 55.2,
      totalReturn: 89.7,
      tradeCount: 456,
      lastMonthReturn: -3.2,
    },
    {
      name: "Volatility Surfer",
      author: "Emma Thompson",
      avatar: rb3,
      winRate: 72.1,
      totalReturn: 215.6,
      tradeCount: 189,
      lastMonthReturn: 18.5,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <div className="pt-24 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <motion.div
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            style={{ opacity, scale }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column with enhanced animations */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8 relative z-10"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute -top-20 -left-20 w-40 h-40 bg-blue-50 rounded-full filter blur-3xl"
                />
                 <motion.h1
                  variants={itemVariants}
                  className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
                >
                  Seamless & Smart
                   <span className="text-green-400 font-serif italic"> The New Era of Algorithmic Trading</span>
                   </motion.h1>


                <motion.p
                  variants={itemVariants}
                  className="text-xl text-gray-600 leading-relaxed italic"
                >
                  Design, Test, and Perfect Your Trading Strategies—No Coding Required. Start in Minutes!
                </motion.p>

                <motion.div variants={itemVariants} className="flex gap-4">
                  <motion.button
                    onClick={handleRedirect}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-green-600 text-white rounded-xl italic font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    Start Building
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border-2 border-green-200 text-black-700 rounded-xl italic font-medium hover:border-green-300 transition-colors"
                    >
                      Watch Demo
                    </motion.button>
                  </a>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <motion.div
                  initial={{ opacity: 8, scale: 0.8 }}
                  animate={{ opacity: 4, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute -top-20 -right-20 w-60 h-60 bg-blue-50 rounded-full filter blur-3xl"
                />
                <img
                  src={tradingImage}
                  alt="Trading Chart Interface"
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Tutorials & Guides */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-24 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-pink-900 mb-4">
              No Experience? No Problem! Simplified Algo Trading & Backtesting for Everyone!
              </h2>
              <p className="text-lg text-black-600 max-w-2xl mx-auto">
                We've got you covered with our beginner-friendly guides ⬇️⬇️
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <TutorialCard
                icon={<BookOpen className="w-6 h-6 text-blue-600" />}
                title="What's Algorithmic Trading and Backtesting?"
                description="A beginner's guide to Algorithmic Trading and Backtesting."
                link="Read More →"
                linkTo="/beginner-guide"
              />
              <TutorialCard
                icon={<ChartBar className="w-6 h-6 text-blue-600" />}
                title="Understanding Metrics"
                description="Master the key metrics that determine your strategy's performance."
                link="Read More →"
                linkTo="/understanding-metrics"
              />
              <TutorialCard
                icon={<Cog className="w-6 h-6 text-blue-600" />}
                title="Strategy Optimization"
                description="Learn advanced techniques to optimize your trading strategies."
                link="Read More →"
                linkTo="/strategy-optimization"
              />
            </div>
          </div>
        </motion.section>

        {/* Stats Overview */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 bg-gradient-to-r from-blue-50 via-white to-blue-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-pink-900 mb-4">
                Platform Statistics
              </h2>
              <p className="text-lg text-black-600 max-w-2xl mx-auto">
                Real-time insights into our platform's performance and user
                achievements
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatsCard
                title="Active Strategies"
                value="1,234"
                icon={<Settings className="w-6 h-6" />}
                percentage="+12.5%"
                trend="up"
              />
              <StatsCard
                title="Average Return"
                value="18.5%"
                icon={<TrendingUp className="w-6 h-6" />}
                percentage="+5.2%"
                trend="up"
              />
              <StatsCard
                title="Best Strategy"
                value="32.4%"
                icon={<Award className="w-6 h-6" />}
                percentage="-2.1%"
                trend="down"
              />
              <StatsCard
                title="Avg Backtest Time"
                value="28s"
                icon={<Clock className="w-6 h-6" />}
                percentage="30% faster"
                trend="up"
              />
            </div>

            {/* Additional Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Total Users
                  </p>
                  <motion.p
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold text-gray-900"
                  >
                    50,000+
                  </motion.p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Daily Trades
                  </p>
                  <motion.p
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold text-gray-900"
                  >
                    125,000+
                  </motion.p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Success Rate
                  </p>
                  <motion.p
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold text-green-600"
                  >
                    85.7%
                  </motion.p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Server Uptime
                  </p>
                  <motion.p
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold text-blue-600"
                  >
                    99.99%
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-24 bg-gradient-to-b from-white via-blue-50 to-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-20" variants={fadeInUp}>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-green-600 font-semibold text-sm uppercase tracking-wide"
              >
               What makes us the best choice?
              </motion.span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
                Powerful Features for
                <span className="text-green-600"> Smarter Trading</span>
              </h2>
              <p className="text-xl text-black-600 max-w-3xl mx-auto">
                Experience the power of algorithmic trading with our
                comprehensive suite of tools
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <FeatureCard
                icon={<Zap className="w-7 h-7" />}
                title="Lightning Fast Execution"
                description="Backtest your strategies in seconds with our optimized engine"
                benefits={[
                  "Sub-millisecond execution",
                  "Real-time updates",
                  "Low latency",
                ]}
                color="blue"
              />
              <FeatureCard
                icon={<Target className="w-7 h-7" />}
                title="Precision Trading"
                description="Advanced algorithms ensuring accurate entry and exit points"
                benefits={[
                  "Smart order routing",
                  "Multi-timeframe analysis",
                  "Risk management",
                ]}
                color="green"
              />
              <FeatureCard
                icon={<Shield className="w-7 h-7" />}
                title="Advanced Security"
                description="Enterprise-grade security protecting your strategies"
                benefits={[
                  "End-to-end encryption",
                  "Two-factor auth",
                  "24/7 monitoring",
                ]}
                color="purple"
              />
            </div>

            {/* Additional Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="space-y-6">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-2xl font-bold text-gray-900"
                >
                  Advanced Analytics Dashboard
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-600"
                >
                  Get deep insights into your trading performance with our
                  comprehensive analytics suite.
                </motion.p>
                <motion.ul className="space-y-4">
                  {[
                    "Real-time performance tracking",
                    "Custom indicator development",
                    "Risk analysis tools",
                    "Portfolio optimization",
                  ].map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </motion.button>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-10 blur-2xl" />
                <img
                  src={tradingImage2}
                  alt="Analytics Dashboard"
                  className="rounded-xl shadow-2xl relative z-10"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Strategies */}
        <section className="py-16 bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-pink-900 mb-4">
                Featured Strategies
              </h2>
              <p className="text-lg text-black-600 max-w-2xl mx-auto">
                Discover high-performing trading strategies created by our
                community of expert traders
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredStrategies.map((strategy, index) => (
                <motion.div
                  key={strategy.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StrategyCard strategy={strategy} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Explore All Strategies
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-24 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-pink-900"
              >
                Recent Activity
              </motion.h2>
              <select
                className="px-3 py-2 border border-black-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                defaultValue="date"
              >
                <option value="date">Sort by Date</option>
                <option value="profit">Sort by Profit</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Strategy Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Profit/Loss
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Timeframe
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <ActivityRow
                    name="MA Crossover Strategy"
                    profit="+12.4%"
                    timeframe="1D"
                  />
                  <ActivityRow
                    name="RSI Divergence"
                    profit="-3.2%"
                    timeframe="4H"
                    isNegative
                  />
                </tbody>
              </table>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-24 bg-orange-600"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-black mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-black-100 mb-8 max-w-2xl mx-auto">
              Join thousands of traders who are already using our platform to
              automate their trading strategies.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black 600 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Get Started for Free
            </motion.button>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
}

function StatsCard({ title, value, icon, percentage, trend }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">{icon}</div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className={`px-2.5 py-1 rounded-lg text-sm font-medium ${
            trend === "up"
              ? "bg-green-50 text-green-600"
              : trend === "down"
              ? "bg-red-50 text-red-600"
              : "bg-gray-50 text-gray-600"
          }`}
        >
          {percentage}
        </motion.div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-baseline gap-2"
      >
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {trend && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`text-sm font-medium ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend === "up" ? "↑" : "↓"}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StrategyCard({ strategy }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={strategy.avatar}
          alt={strategy.author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900">{strategy.name}</h3>
          <p className="text-sm text-gray-500">by {strategy.author}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Win Rate</span>
          <span
            className={`text-sm font-medium ${
              strategy.winRate >= 50 ? "text-green-600" : "text-red-600"
            }`}
          >
            {strategy.winRate}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Return</span>
          <span
            className={`text-sm font-medium ${
              strategy.totalReturn >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {strategy.totalReturn}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Trade Count</span>
          <span className="text-sm font-medium text-gray-900">
            {strategy.tradeCount}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Last 30 Days</span>
          <span
            className={`text-sm font-medium ${
              strategy.lastMonthReturn >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {strategy.lastMonthReturn >= 0 ? "+" : ""}
            {strategy.lastMonthReturn}%
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}

function ActivityRow({ name, profit, timeframe, isNegative = false }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: "#f9fafb" }}
      className="hover:bg-gray-50 transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className={`text-sm font-medium ${
            isNegative ? "text-red-600" : "text-green-600"
          }`}
        >
          {profit}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{timeframe}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          View Details
        </motion.button>
      </td>
    </motion.tr>
  );
}

function TutorialCard({ icon, title, description, link, linkTo }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <Link to={linkTo}>
        <motion.span
          whileHover={{ x: 5 }}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1 cursor-pointer"
        >
          {link}
        </motion.span>
      </Link>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description, benefits, color }) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl transition-all duration-300 group-hover:scale-110" />
      <div className="bg-white p-8 rounded-2xl shadow-lg relative">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`w-14 h-14 bg-gradient-to-r ${colors[color]} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <motion.li
              key={benefit}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors[color]}`}
              />
              {benefit}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
