import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/general/NavBar";
import SendVideoContainer from "../components/sendvideo/SendVideoContainer";

const SendVideoPage = () => {
  const [auth, setAuth] = useState();
  const [subscription, setSubscription] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("auth") === "true";
    const sub = localStorage.getItem("subscription") === "true";
    setAuth(auth);
    setSubscription(sub);
    if (auth === false) navigate("/login", { replace: true });
    //else if (sub === false) navigate("/checkout", { replace: true });
  }, [auth, subscription, navigate]);

  return (
    <div>
      <NavBar />
      <SendVideoContainer />
    </div>
  );
};

export default SendVideoPage;
