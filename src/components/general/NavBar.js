import React, { useEffect, useState } from "react";
import Header from "./Header.js";
import LogInButton from "./LoginButton";
import LogOutButton from "./LogOutButton.js";
import DashboardButton from "./DashboardButton.js";
import SendVideoButton from "./SendVideoButton";

const NavBar = () => {
  const [auth, setAuth] = useState(localStorage.getItem("auth") === "true");

  useEffect(() => {
    const updateAuth = () => {
      setAuth(localStorage.getItem("auth") === "true");
    };

    window.addEventListener("storage", updateAuth);

    return () => window.removeEventListener("storage", updateAuth);
  }, []);

  if (auth) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 rounded-b-lg shadow-lg bg-white">
        <Header />
        <div className="flex">
          <SendVideoButton />
          <DashboardButton />
          <LogOutButton />
        </div>
      </div>
    );
  } else {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 rounded-b-lg shadow-lg bg-white">
        <Header />
        <LogInButton />
      </div>
    );
  }
};

export default NavBar;
