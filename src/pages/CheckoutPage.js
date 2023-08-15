import React from "react";
import Checkout from "../components/checkout/Checkout";
import CoachNavBar from "../components/coachDashboard/CoachNavBar";
import CheckoutMsg from "../components/checkout/CheckoutMsg";

const CheckoutPage = () => {
  return (
    <div>
      <CheckoutMsg />
      <CoachNavBar />
      <Checkout />
    </div>
  );
};

export default CheckoutPage;
