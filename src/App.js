import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Landing from "./pages/Landing";
import LogIn from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import SendVideoPage from "./pages/SendVideoPage";
import CoachDashboard from "./pages/CoachDashboard";
import CheckoutPage from "./pages/CheckoutPage";
import Flow from "./pages/Flow";

export const AuthContext = React.createContext();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const App = () => {
  const [auth, setAuth] = useState(false);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <Router>
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sendvideo" element={<SendVideoPage />} />
            <Route path="/coachdashboard" element={<CoachDashboard />} />
            <Route path="/flow" element={<Flow />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </Elements>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
