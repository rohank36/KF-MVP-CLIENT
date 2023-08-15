import React from "react";
import { useNavigate } from "react-router-dom";

const SendVideoButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/sendvideo");
  };

  return (
    <button
      onClick={handleClick}
      className="ml-5 transition-all duration-500 ease-in-out transform motion-safe:hover:scale-110 rounded-lg p-4 text-slate-900 text-xl font-semibold bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:text-white text-xl hover:bg-sky-500 hover:ring-sky-500"
    >
      Send Video
    </button>
  );
};

export default SendVideoButton;
