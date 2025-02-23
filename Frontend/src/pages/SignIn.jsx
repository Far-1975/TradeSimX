import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-4 py-16 relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Left Side - Form */}
          <div className="p-8 lg:p-12">
            <motion.div variants={itemVariants} className="text-center mb-8">
              <motion.div
                className="w-16 h-16 bg-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Lock className="w-8 h-8 text-black" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back!
              </h2>
              <p className="text-gray-600">Sign in to continue your journey</p>
            </motion.div>

            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-green-400 group-hover:text-green-500 transition-colors" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-black-300 rounded-lg 
                             focus:ring-blue-500 focus:border-green-500 transition-all duration-300
                             hover:border-blue-400 bg-gray-50 hover:bg-white"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-green-400 group-hover:text-green-500 transition-colors" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-black-300 rounded-lg 
                             focus:ring-blue-500 focus:border-blue-500 transition-all duration-300
                             hover:border-blue-400 bg-gray-50 hover:bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-green-500 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-green-500 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="/sign-in"
                  className="text-sm font-medium text-green-600 hover:text-green-500"
                >
                  Forgot your password?
                </motion.a>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center items-center py-3 px-4 bg-green-600 text-black rounded-lg 
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
                         font-medium shadow-lg transition-all duration-300"
              >
                Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.form>
          </div>

          {/* Right Side - Image/Info */}
          <div className="hidden md:block relative bg-green-600 p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-blue-800" />
            <div className="relative z-10 h-full flex flex-col justify-center text-black">
              <motion.h3
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-bold mb-4"
              >
                Welcome Back!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 3, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-blue-100"
              >
                Sign in to access your account and continue your trading journey
                with our advanced algorithmic platform.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div variants={itemVariants} className="text-center mt-8">
          <span className="text-black-600">Don't have an account? </span>
          <Link to="/sign-up">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-medium text-green-600 hover:text-blue-500 inline-block cursor-pointer"
            >
              Sign up
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
