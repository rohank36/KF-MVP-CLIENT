import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    //Create payment method using stripe
    const { paymentMethod, error: stripeError } =
      await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    //Send req to backend to create subscription on server side
    const response = await fetch("/api/users/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentMethod: paymentMethod.id,
        priceId: process.env.REACT_APP_STRIPE_PRICE,
      }),
      credentials: "include",
    });

    const resData = await response.json();

    if (resData.status != "success") {
      setError("Failed to create subscription");
      setLoading(false);
      console.log(resData);
      return;
    }

    //Confirm payment
    const confirmResult = await stripe.confirmCardPayment(resData.clientSecret);
    if (confirmResult.error) {
      setError(confirmResult.error.message);
      setLoading(false);
      console.log(confirmResult.error.message);
      return;
    }

    //Successfully Subscribed
    setLoading(false);
    alert(
      "Subscription created sucessfully!...Thank you message, make this modal later.."
    );
  };

  return (
    <div className="flex justify-center items-center mt-36">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full mx-auto p-12 bg-white rounded-lg shadow-xl"
      >
        <div className="mb-6 text-center">
          <label className="block text-xl font-medium text-gray-600">
            Please Enter Your Credit Card Info:
          </label>
          <div className="mt-2 p-4 border rounded">
            <CardElement className="w-full" />
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-md italic mb-4">{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
