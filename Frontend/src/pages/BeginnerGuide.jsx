import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

export function BeginnerGuide() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-white to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Beginner's Guide to Algorithmic Trading and Backtesting
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Unlock the secrets of automated trading and test your ideas
                risk-free. This guide makes it easy for anyone to get started!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 1: What is Algorithmic Trading? */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                What is Algorithmic Trading?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Algorithmic Trading, also called Algo Trading, is the process of
                using computer programs to make trading decisions. These
                programs follow a set of rules, like when to buy or sell stocks,
                based on market data.
              </p>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                Imagine telling a computer, "Buy the stock if its price drops by
                5%," or "Sell it if the price rises by 10%." The program will
                execute this automatically, even while you're sleeping!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 2: What is Backtesting? */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                What is Backtesting?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Backtesting is like trying out your trading rules on past data
                to see if they would have worked. For example, you could test a
                rule like, "Buy when the price is low and sell when it's high,"
                using data from the last year.
              </p>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                This helps you see if your idea is likely to make money before
                risking any real money in the market.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Pros and Cons */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                Pros of Algorithmic Trading
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">
                    Advantages
                  </h3>
                  <ul className="text-lg text-gray-600 list-disc list-inside">
                    <li>Saves time and effort—no manual trading.</li>
                    <li>Reduces emotional decisions in trading.</li>
                    <li>Can trade 24/7 without missing opportunities.</li>
                    <li>Allows you to backtest strategies risk-free.</li>
                  </ul>
                </div>
                {/* <div>
                <h3 className="text-2xl font-bold text-red-600 mb-2">
                  Disadvantages
                </h3>
                <ul className="text-lg text-gray-600 list-disc list-inside">
                  <li>Requires technical knowledge to set up.</li>
                  <li>
                    Can result in losses if the strategy is poorly designed.
                  </li>
                  <li>Not all strategies work in all market conditions.</li>
                  <li>Overfitting to past data can give false confidence.</li>
                </ul>
              </div> */}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
