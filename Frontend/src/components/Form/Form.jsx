import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";

import { StrategySection } from "./StrategySection";

import { AssetSection } from "./AssetSection";

import { RiskSection } from "./RiskSection";

import { ExitPointSection } from "./ExitPointSection";

import { EntryPointSection } from "./EntryPointSection";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Loader from "./Loader";

function simplifyConditions(obj) {
  const result = [];

  // Helper function to recursively process conditions

  function processConditions(condition) {
    if (condition.conditions && Array.isArray(condition.conditions)) {
      condition.conditions.forEach(processConditions);
    }

    result.push({
      id: condition.id,

      compareWith: condition.compareWith,

      operator: condition.operator,

      useValue: condition.useValue,

      value: condition.value,
    });
  }

  // Start processing from the top-level object

  processConditions(obj);

  return result;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },

  animate: {
    opacity: 1,

    y: 0,

    transition: {
      duration: 0.5,

      when: "beforeChildren",

      staggerChildren: 0.1,
    },
  },

  exit: { opacity: 0, y: -20 },
};

const sectionVariants = {
  initial: { opacity: 0, x: -20 },

  animate: { opacity: 1, x: 0 },

  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

const titleVariants = {
  initial: { opacity: 0, y: -20 },

  animate: {
    opacity: 1,

    y: 0,

    transition: { duration: 0.5 },
  },
};

const sparkleVariants = {
  animate: {
    scale: [1, 1.2, 1],

    rotate: [0, 15, -15, 0],

    transition: {
      duration: 2,

      repeat: Infinity,

      repeatType: "reverse",
    },
  },
};

export function Form() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);

  const [formData, setFormData] = useState({
    strategy: { name: "", description: "" },

    asset: {
      type: "stocks",
      symbol: "",
      timeframe: { startDate: "", endDate: "", interval: "1d" },
    },

    risk: {
      stopLoss: 5,

      takeProfit: 10,

      trailStart: 2,

      trailBy: 1,

      takeProfitTrailStart: 2,

      takeProfitTrailBy: 1,
    },
  });

  const [errors, setErrors] = useState({});

  const [isDirty, setIsDirty] = useState(false);

  const [entryPoints, setEntryPoints] = useState([]);

  const [exitPoints, setExitPoints] = useState([]);

  const [customIndicators, setCustomIndicators] = useState([]);

  useEffect(() => {
    if (isDirty) validateForm();
  }, [formData, isDirty]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.strategy.name.trim())
      newErrors.strategy = { name: "Strategy name is required" };

    if (
      formData.asset.timeframe.startDate &&
      formData.asset.timeframe.endDate
    ) {
      const start = new Date(formData.asset.timeframe.startDate);

      const end = new Date(formData.asset.timeframe.endDate);

      if (start > end)
        newErrors.asset = { endDate: "End date must be after start date" };
    }

    if (formData.risk.stopLoss <= 0)
      newErrors.risk = { stopLoss: "Stop loss must be positive" };

    if (formData.risk.takeProfit <= 0)
      newErrors.risk = { takeProfit: "Take profit must be positive" };

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const transformOperators = {
    crosses_above: ">",

    crosses_below: "<",

    greater_than_equal_to: ">=",

    less_than_equal_to: "<=",

    equals: "==",
  };

  const transformConditions = (entry_conditions) => {
    const transformedConditions = [];

    for (const each_condition of entry_conditions) {
      let temp = [];

      for (const condition of each_condition) {
        temp.push({
          lhs: condition.id,

          operator: transformOperators[condition.operator],

          rhs: {
            type: condition.useValue ? "number_input" : "indicator",

            indicator: condition.compareWith,

            value: condition.value,

            sign: "None",
          },
        });
      }

      transformedConditions.push(temp);
    }

    return transformedConditions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsDirty(true);

    if (validateForm()) {
      const finalFormData = {
        ...formData,

        entryPoints,

        exitPoints,
      };

      let entry_conditions = [];

      let exit_conditions = [];

      for (const entry of finalFormData.entryPoints) {
        entry_conditions.push(simplifyConditions(entry));
      }

      for (const exit of finalFormData.exitPoints) {
        exit_conditions.push(simplifyConditions(exit));
      }

      entry_conditions = transformConditions(entry_conditions);

      exit_conditions = transformConditions(exit_conditions);

      // Format custom indicators

      const formatted_custom_indicators = customIndicators.map((indicator) => ({
        name: indicator.name,

        op1: indicator.firstIndicator,

        oper: indicator.operator,

        op2: indicator.secondIndicator,
      }));

      const risk_management = {
        stop_loss: {
          type: "fixed",
          value: finalFormData.risk.stopLoss,
          sign: "%",
        },

        take_profit: {
          type: "fixed",
          value: finalFormData.risk.takeProfit,
          sign: "%",
        },

        trailing_stop_loss: {
          type: "trailing",

          activation: {
            value: finalFormData.risk.trailStart,

            sign: "%",
          },

          callback: {
            value: finalFormData.risk.trailBy,

            sign: "%",
          },
        },

        trailing_take_profit: {
          type: "trailing",

          activation: {
            value: finalFormData.risk.takeProfitTrailStart,

            sign: "%",
          },

          callback: {
            value: finalFormData.risk.takeProfitTrailBy,

            sign: "%",
          },
        },
      };

      const formToSubmit = {
        ticker: finalFormData.asset.symbol,

        start_date: finalFormData.asset.timeframe.startDate,

        end_date: finalFormData.asset.timeframe.endDate,

        interval: finalFormData.asset.timeframe.interval,

        custom_indicators: formatted_custom_indicators,

        entry_conditions: entry_conditions,

        exit_conditions: exit_conditions,

        risk_management: risk_management,
      };

      console.log("Form submitted:", formToSubmit);

      setLoading(true);
      const url = "https://tradewave-mzyn.onrender.com/api/backtest";
      const response = await axios.post(url, formToSubmit, {
        headers: {
          "Content-Type": "application/json", // Set the header for JSON
        },
      });
      setLoading(false);
      console.log(response);
      console.log(response.data.data);

      if (response.status == 200) {
        if (response.data.message == "No trades generated") {
          navigate("/graph", {
            state: { data: [], insights: [], report_id: "" },
          });
        }
        navigate("/graph", {
          state: {
            data: response.data.data,
            insights: response.data.insights.insights,
            report_id: response.data.report_id,
          },
        });
      } else {
        setFormError(true);
        setTimeout(() => {
          setFormError(false);
        }, 5000);
      }
    } else {
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 5000);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decorations */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-left circle */}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"
        />

        {/* Bottom-right circle */}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl"
        />

        {/* Center decoration */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-[500px] h-[500px] rotate-45 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full filter blur-3xl" />
        </motion.div>

        {/* Floating dots */}

        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,

                x: Math.random() * window.innerWidth,

                y: Math.random() * window.innerHeight,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],

                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,

                delay: i * 0.2,

                repeat: Infinity,

                repeatType: "reverse",
              }}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Main Form */}

      <motion.form
        onSubmit={handleSubmit}
        className="relative max-w-7xl mx-auto p-8 bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Title Section */}

        <motion.div className="mb-12 text-center" variants={titleVariants}>
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Create Your Trading Strategy
          </motion.h1>

          <motion.p
            className="text-xl text-black-600 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span>Backtest your strategy with ease and precision</span>

            <motion.span
              className="inline-block"
              variants={sparkleVariants}
              animate="animate"
            >
              ✨
            </motion.span>
          </motion.p>

          <motion.div
            className="mt-6 w-24 h-1 bg-gradient-to-r from-green-500 to-blue-700 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </motion.div>

        {/* Strategy and Asset Section */}

        <motion.div className="grid md:grid-cols-2 gap-8 mb-8 border-1">
          <motion.div
            variants={sectionVariants}
            whileHover="hover"
            className="p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-black/20"
          >
            <StrategySection
              data={formData.strategy}
              onChange={(data) => {
                setFormData((prev) => ({ ...prev, strategy: data }));

                setIsDirty(true);
              }}
              error={errors.strategy?.name}
            />
          </motion.div>

          <motion.div
            variants={sectionVariants}
            whileHover="hover"
            className="p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-black/20"
          >
            <AssetSection
              data={formData.asset}
              onChange={(data) =>
                setFormData((prev) => ({ ...prev, asset: data }))
              }
            />
          </motion.div>
        </motion.div>

        {/* Trading Rules Section */}

        <motion.div className="mb-8 text-center" variants={sectionVariants}>
          <motion.h2
            className="text-2xl font-bold text-pink-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Trading Rules
          </motion.h2>

          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
            <motion.div
              variants={sectionVariants}
              whileHover="hover"
              className="p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-black/20"
            >
              <EntryPointSection
                data={entryPoints}
                onChange={setEntryPoints}
                customIndicators={customIndicators}
                onCustomIndicatorChange={setCustomIndicators}
              />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              whileHover="hover"
              className="p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-black/20"
            >
              <ExitPointSection
                data={exitPoints}
                onChange={setExitPoints}
                customIndicators={customIndicators}
                onCustomIndicatorChange={setCustomIndicators}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Risk Management Section */}

        <motion.div className="mb-8 text-center" variants={sectionVariants}>
          <motion.h2
            className="text-2xl font-bold text-pink-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Risk Management
          </motion.h2>

          <motion.div
            variants={sectionVariants}
            whileHover="hover"
            className="p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg max-w-5xl mx-auto border border-black/20"
          >
            <RiskSection
              data={formData.risk}
              onChange={(data) => {
                setFormData((prev) => ({ ...prev, risk: data }));

                setIsDirty(true);
              }}
              errors={errors.risk}
            />
          </motion.div>
        </motion.div>

        {/* Action Buttons */}

        <motion.div
          className="flex justify-between items-center mt-12"
          variants={sectionVariants}
        >
          <motion.button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg shadow-lg hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
          >
            {loading ? <Loader /> : "Backtest Strategy"}
          </motion.button>

          {loading ? (
            <p className="text-sm text-gray-600">
              As we are using a free hosting service, sometimes backtesting may
              take some time. Please be patient. We promise it&apos;s worth the
              wait!
            </p>
          ) : formError ? (
            <p className="text-sm text-red-600">
              An error occurred. Please check that you&apos;ve filled all the
              fields correctyly.
            </p>
          ) : (
            ""
          )}

          {/* <div className="flex gap-4">
            <motion.button
              type="button"
              onClick={() => console.log("Load Strategy")}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load Strategy
            </motion.button>

            <motion.button
              type="button"
              onClick={() => console.log("Save Strategy")}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Strategy
            </motion.button>
          </div> */}
        </motion.div>
      </motion.form>
    </div>
  );
}
