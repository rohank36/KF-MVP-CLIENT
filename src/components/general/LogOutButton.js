import React from "react";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.status === "success") {
        localStorage.setItem("auth", false);
        navigate("/");
      } else {
        alert("Something went wrong");
        console.log(responseData);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <button
      onClick={handleClick}
      className="transition-all duration-500 ease-in-out transform motion-safe:hover:scale-110 rounded-lg p-4 text-slate-900 text-xl font-semibold bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:text-white text-xl hover:bg-sky-500 hover:ring-sky-500"
    >
      Log Out
    </button>
  );
};

export default LogOutButton;
