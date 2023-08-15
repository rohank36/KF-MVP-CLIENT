import React, { useEffect, useState } from "react";
import Header from "../general/Header.js";

const CoachNavBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 rounded-b-lg shadow-lg bg-white">
      <Header />
    </div>
  );
};

export default CoachNavBar;
