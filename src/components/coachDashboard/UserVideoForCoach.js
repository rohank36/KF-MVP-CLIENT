import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import VideoAnnotation from "./VideoAnnotation";
import CoachMsgAndInstruction from "./CoachMsgAndInstructions";
import CoachNavBar from "./CoachNavBar";
import Drawing from "./Drawing";

const UserVideoForCoach = () => {
  const [signedUrl, setSignedUrl] = useState(
    sessionStorage.getItem("signedUrl") || ""
  );
  const [videoTitle, setVideoTitle] = useState(
    sessionStorage.getItem("videoTitle") || ""
  );
  const [validVideoID, setValidVideoID] = useState(
    sessionStorage.getItem("videoIDAuth") === "true"
  );
  const [videoID, setVideoID] = useState(
    sessionStorage.getItem("videoID") || ""
  );
  const [coachName, setCoachName] = useState(
    sessionStorage.getItem("coachName") || ""
  );

  const getVideo = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/videos/coachDashboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video_id: videoID,
        }),
        credentials: "include",
      });
      const resData = await response.json();
      if (resData.status === "success") {
        sessionStorage.setItem("videoIDAuth", true);
        sessionStorage.setItem("videoID", videoID);
        sessionStorage.setItem("signedUrl", resData.signedUrl);
        sessionStorage.setItem("videoTitle", resData.video.videoTitle);
        sessionStorage.setItem("coachName", coachName);
        setCoachName(coachName);
        setValidVideoID(true);
        setSignedUrl(resData.signedUrl);
        setVideoTitle(resData.video.videoTitle);
      } else {
        alert(`ERROR!\n${resData.message}`);
        sessionStorage.setItem("videoIDAuth", false);
        console.log(resData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    alert(
      "Please note that if you refresh your browser, your current recording will not be saved"
    );
    setSignedUrl(sessionStorage.getItem("signedUrl"));
  }, []);

  return (
    <div className="">
      <div className="">
        {!validVideoID && (
          <div>
            <CoachNavBar />
            <CoachMsgAndInstruction />
            <form onSubmit={getVideo} className="mt-10">
              <label className="block w-full ">
                <span className="block text-md font-medium text-slate-700">
                  Enter Video ID from email{" "}
                  <span style={{ color: "red" }}>*</span>
                </span>
                <input
                  type="String"
                  value={videoID}
                  onChange={(e) => setVideoID(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
 
"
                />
              </label>
              <label className="block w-full mt-6">
                <span className="block text-md font-medium text-slate-700">
                  Enter Your Full Name
                  <span style={{ color: "red" }}> *</span>
                </span>
                <input
                  type="String"
                  value={coachName}
                  onChange={(e) => setCoachName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
 
"
                />
              </label>
              <button
                type="submit"
                className="mt-3 px-2 py-2 bg-sky-500 text-white text-lg font-semibold rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:bg-sky-600"
              >
                Continue
              </button>
            </form>
          </div>
        )}
      </div>
      <div>
        {validVideoID && (
          <div className="relative">
            <div className="flex flex-col justify-center items-center h-screen">
              <h1 className=" text-slate-900 text-xl font-semibold">
                {videoTitle} - Reviewed By: {coachName}
              </h1>

              <ReactPlayer
                url={signedUrl}
                controls={true}
                width="95%"
                height="85%"
              />
              <div className="flex flex-row">
                <Drawing />
                <VideoAnnotation
                  videoID={videoID}
                  videoTitle={videoTitle}
                  setValidVideoID={setValidVideoID}
                  setVideoID={setVideoID}
                  setCoachName={setCoachName}
                  setSignedUrl={setSignedUrl}
                  setVideoTitle={setVideoTitle}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserVideoForCoach;
