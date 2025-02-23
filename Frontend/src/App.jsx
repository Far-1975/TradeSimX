import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Form } from "./components/Form/Form";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { Signup } from "./pages/SignUp";
import { Graph } from "./pages/Graph";
import { StrategyOptimization } from "./pages/StrategyOptimization";
import { UnderstandingMetrics } from "./pages/UnderstandingMetrics";
import { BeginnerGuide } from "./pages/BeginnerGuide";
// import data from './data.json';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/form" element={<Form />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/beginner-guide" element={<BeginnerGuide />} />
        <Route
          path="/strategy-optimization"
          element={<StrategyOptimization />}
        />
        <Route
          path="/understanding-metrics"
          element={<UnderstandingMetrics />}
        />
      </Routes>
    </Router>
  );
};

export default App;
