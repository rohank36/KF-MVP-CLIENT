import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="">
      <button
        onClick={handleClick}
        className="text-slate-900 text-5xl font-semibold"
      >
        KaizenFlo{"\u{1F30A}"}
      </button>
      <p className="text-slate-500 text-lg pt-2">1% Better Everyday.</p>
    </div>
  );
};

export default Header;
