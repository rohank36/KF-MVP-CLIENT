import React from "react";

const MyAccount = ({ propGym, propEmail, propFullName, propSubscription }) => {
  return (
    <div className="py-40">
      <h1 className="text-slate-900 text-xl font-semibold">👤 My Account</h1>
      <ul>
        <li className="text-slate-500 text-md pt-3 ">Academy: {propGym} </li>
        <li className="text-slate-500 text-md pt-3 ">Email: {propEmail}</li>
        <li className="text-slate-500 text-md pt-3">
          Full Name: {propFullName}
        </li>
        <li className="text-slate-500 text-md pt-3">
          Active Subscription: {propSubscription ? "Yes" : "No"}
        </li>
      </ul>
    </div>
  );
};

export default MyAccount;
