import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupContainer = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gym, setGym] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://kaizenflo-01afa622f2f4.herokuapp.com/api/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            gym: gym,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === "error") {
        localStorage.setItem("auth", false);
        if (responseData.error.code === 11000) {
          alert("Email is already taken. Please use a different email.");
        } else {
          if (responseData.error.errors.email)
            alert(responseData.error.errors.email.message);
          else if (responseData.error.errors.firstName)
            alert(responseData.error.errors.firstName.message);
          else if (responseData.error.errors.lastName)
            alert(responseData.error.errors.lastName.message);
          else if (responseData.error.errors.password)
            alert(responseData.error.errors.password.message);
          else if (responseData.error.errors.passwordConfirm)
            alert(responseData.error.errors.passwordConfirm.message);
        }
      } else if (responseData.status === "fail") {
        if (responseData.message === "KaizenFlo only open for beta users") {
          alert(
            `KaizenFlo is only available for selected beta users.\nTo join our waitlist click the link on our homepage`
          );
          navigate("/");
        }
      } else {
        localStorage.setItem("auth", true);
        navigate("/login");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className="mx-auto mt-10">
      <h2 className="justify-center  text-slate-900 text-2xl font-semibold">
        Welcome
      </h2>
      <label className="mt-10 block">
        <span className="block text-sm font-medium text-slate-700">
          First Name <span style={{ color: "red" }}>*</span>
        </span>
        <input
          type="string"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
    "
        />
      </label>

      <label className="mt-4 block">
        <span className="block text-sm font-medium text-slate-700">
          Last Name <span style={{ color: "red" }}>*</span>
        </span>
        <input
          type="string"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
    "
        />
      </label>

      <label className="mt-4 block w-full">
        <span className="block text-sm font-medium text-slate-700">
          Email <span style={{ color: "red" }}>*</span>
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
     
    "
        />
      </label>

      <label className="mt-4 block w-full">
        <span className="block text-sm font-medium text-slate-700">
          Academy Name
        </span>
        <input
          type="string"
          value={gym}
          onChange={(e) => setGym(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
    "
        />
      </label>

      <label className="mt-4 block w-full">
        <span className="block text-sm font-medium text-slate-700">
          Password <span style={{ color: "red" }}>*</span>
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

      <label className="mt-4 block w-full">
        <span className="block text-sm font-medium text-slate-700">
          Confirm Password <span style={{ color: "red" }}>*</span>
        </span>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
    "
        />
      </label>

      <button
        onClick={handleClick}
        className="flex justify-items-center hover:text-sky-500 mt-10 text-xl font-medium text-slate-700"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupContainer;
