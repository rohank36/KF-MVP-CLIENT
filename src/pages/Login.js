import React from "react";
import LoginContainer from "../components/login/LoginContainer";
import Header from "../components/general/Header";

const LogIn = () => {
  return (
    <div>
      <div className="p-3">
        <Header />
      </div>
      <h2 className="flex justify-center mt-32 text-slate-900 text-2xl font-semibold">
        Welcome
      </h2>
      <LoginContainer />
    </div>
  );
};

export default LogIn;
