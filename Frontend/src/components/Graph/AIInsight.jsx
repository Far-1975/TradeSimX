import React, { useState, useRef, useEffect } from "react";
import {
  Brain,
  Send,
  Bot,
  User,
  TrendingUp,
  Clock,
  Sun,
  Shield,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export function AIInsight({ insights, data }) {
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      content:
        "Hello! I am your AI trading assistant. How can I help you analyze your trading strategy?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: "user",
      content: inputMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    let res;
    try {
      res = await axios.post("https://tradewave-mzyn.onrender.com/chat", {
        backtest_results: {
          insights,
          data,
        },
        message: inputMessage,
      });
      res = res.data.message;
    } catch (error) {
      console.error("Error:", error);
      res = "Error occurred while calling the API";
    }
    console.log(res);

    setTimeout(() => {
      setIsTyping(false);
      const botMessage = {
        type: "assistant",
        content: res,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {/* Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-6 border border-purple-100"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-full shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Strategy Insights
            </h3>
            <p className="text-sm text-gray-600">
              AI-powered analysis of your trading patterns
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Overview Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h4 className="font-semibold text-gray-800">Strategy Overview</h4>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our AI has analyzed your trading strategy and identified key
              patterns and insights.
            </p>
          </motion.div>

          {/* Insights Grid */}
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white rounded-xl border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors duration-300">
                    {index % 4 === 0 && (
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    )}
                    {index % 4 === 1 && (
                      <Clock className="w-5 h-5 text-purple-600" />
                    )}
                    {index % 4 === 2 && (
                      <Sun className="w-5 h-5 text-purple-600" />
                    )}
                    {index % 4 === 3 && (
                      <Shield className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  <p className="text-gray-700 flex-1">{insight}</p>
                  <ChevronRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Chatbot Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-[800px]"
      >
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-purple-600 rounded-t-xl sticky top-0 z-10">
          <div className="bg-white p-2 rounded-full shadow-md">
            <Bot className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              AI Trading Assistant
            </h3>
            <p className="text-purple-100">
              Ask me anything about your trading strategy
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent hover:scrollbar-thumb-purple-300">
          <div className="p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-3 max-w-[80%]
                    ${message.type === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm
                      ${
                        message.type === "user"
                          ? "bg-blue-500"
                          : "bg-purple-500"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div
                      className={`p-4 rounded-2xl shadow-sm
                      ${
                        message.type === "user"
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-gray-500"
                >
                  <Bot className="w-5 h-5" />
                  <div className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    >
                      .
                    </span>
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    >
                      .
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} className="h-px" />
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSendMessage}
          className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-xl sticky bottom-0 z-10"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about your trading strategy..."
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
