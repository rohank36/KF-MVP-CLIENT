import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { AuthContext } from "../../App";

const LoginContainer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [auth, setAuth] = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://kaizenflo-01afa622f2f4.herokuapp.com/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          credentials: "include",
        }
      );
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.error) {
        localStorage.setItem("auth", false);
        alert(responseData.message);
      } else {
        localStorage.setItem("auth", true);
        localStorage.setItem(
          "subscription",
          responseData.data.user.activeSubscription
        );
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form className="mx-auto mt-10 flex flex-col items-center">
      <label className="block w-1/4">
        <span className="block text-sm font-medium text-slate-700">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
     
    "
        />
      </label>
      <label className="mt-4 block w-1/4">
        <span className="block text-sm font-medium text-slate-700">
          Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
    "
        />
      </label>
      <button
        onClick={handleClick}
        className=" hover:text-sky-500 mt-10 text-xl font-medium text-slate-700"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginContainer;
