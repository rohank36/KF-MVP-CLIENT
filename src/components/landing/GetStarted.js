import React from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <button
      onClick={handleClick}
      className="transition-all duration-500 ease-in-out transform motion-safe:hover:scale-110 rounded-lg p-3 text-slate-900 text-3xl font-semibold bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:text-white text-xl hover:bg-sky-500 hover:ring-sky-500"
    >
      For Selected Beta Users Only
    </button>
  );
};

export default GetStarted;
