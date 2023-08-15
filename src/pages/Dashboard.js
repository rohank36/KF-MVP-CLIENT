import React, { useContext, useEffect, useState, useRef } from "react";
//import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/general/NavBar";
import DashWelcomeMsg from "../components/dashboard/DashWelcomeMsg";
import DashMenu from "../components/dashboard/DashMenu";
import MyAccount from "../components/dashboard/MyAccount";
import SendVideo from "../components/dashboard/SendVideo";
import MyVideos from "../components/dashboard/MyVideos";

const Dashboard = () => {
  //const [auth, setAuth] = useContext(AuthContext);
  const [auth, setAuth] = useState();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [gym, setGym] = useState("");
  const [subscription, setSubscription] = useState();
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const myVideosRef = React.useRef(null);
  const sendVideoRef = React.useRef(null);
  const myAccountRef = React.useRef(null);
  const headerRef = React.useRef(null);

  const getUser = async () => {
    try {
      const response = await fetch(
        `https://kaizenflo-01afa622f2f4.herokuapp.com/api/users/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const resData = await response.json();

      if (resData.status === "fail") {
        alert(resData.message);
        navigate("/login", { replace: true });
      } else if (resData.status === "error") {
        alert(`ERROR\n${resData.message}`);
        console.log(resData);
      } else {
        setFirstName(resData.user.firstName);
        setGym(resData.user.gym);
        setEmail(resData.user.email);
        setFullName(resData.user.fullName);
        setSubscription(resData.user.activeSubscription);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getVideos = async () => {
    try {
      const response = await fetch(
        `https://kaizenflo-01afa622f2f4.herokuapp.com/api/videos/getUserVideos`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const resData = await response.json();
      if (resData.status === "success") {
        setVideos(resData.videos);
      } else {
        console.log(resData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("auth") === "true";
    const sub = localStorage.getItem("subscription") === "true";
    setSubscription(sub);
    setAuth(auth);
    if (auth === false) navigate("/login", { replace: true });
    //else if (sub === false) navigate("/checkout", { replace: true });
    getUser();
    getVideos();
  }, [auth, subscription, navigate]);

  return (
    <div>
      <div ref={headerRef}>
        <NavBar />
      </div>

      <div className="flex items-start">
        <DashMenu
          propMenuOptions={["My Videos", "Send Video", "My Account"]}
          myVideosRef={myVideosRef}
          sendVideoRef={sendVideoRef}
          myAccountRef={myAccountRef}
          headerRef={headerRef}
        />
        <div className="flex flex-col pl-96 mt-36 w-full overflow-auto">
          <DashWelcomeMsg propFirstName={firstName} propAuth={auth} />
          <div ref={myVideosRef}>
            <MyVideos propVideos={videos} />
          </div>
          <div ref={sendVideoRef}>
            <SendVideo />
          </div>
          <div ref={myAccountRef}>
            <MyAccount
              propGym={gym}
              propEmail={email}
              propFullName={fullName}
              propSubscription={subscription}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
