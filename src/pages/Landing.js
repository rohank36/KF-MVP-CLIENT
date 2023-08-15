import React from "react";
import NavBar from "../components/general/NavBar";
import Description from "../components/landing/Description";
import GetStarted from "../components/landing/GetStarted";

const Landing = () => {
  return (
    <div>
      <NavBar />
      <Description />
      <div className=" mt-20 flex justify-center items-center">
        <GetStarted />
      </div>
    </div>
  );
};

export default Landing;
