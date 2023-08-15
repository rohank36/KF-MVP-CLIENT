import React from "react";
import SignupContainer from "../components/signup/SignupContainer";

const Signup = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <SignupContainer className="flex flex-col" />
      </div>
      <div className="w-1/2">
        <img
          src="/img1.PNG"
          className="object-cover h-screen w-full"
          alt="bjj athlete celebrating"
        />
      </div>
    </div>
  );
};

export default Signup;
