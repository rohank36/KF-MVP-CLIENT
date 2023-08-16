import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SendVideoContainer = () => {
  const [videoTitle, setVideoTitle] = useState("");
  const [compName, setCompName] = useState("");
  const [round, setRound] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [coachEmail, setCoachEmail] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const navigate = useNavigate();

  const sendUserVideo = async (e) => {
    e.preventDefault();

    setIsModalOpen(true);

    const formData = new FormData();
    formData.append("videoTitle", videoTitle);
    formData.append("compName", compName);
    formData.append("round", round);
    formData.append("opponentName", opponentName);
    formData.append("coachEmail", coachEmail);

    const fileInput = document.querySelector('input[type="file"]');
    formData.append("video", fileInput.files[0]);

    try {
      const response = await axios.post(
        "https://kaizenflo-01afa622f2f4.herokuapp.com/api/videos/sendUserVideo",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadPercentage(percentCompleted);
          },
          withCredentials: true,
        }
      );

      const resData = response.data;
      console.log(resData);
      if (resData.status === "success") {
        setUploadStatus("SUCCESS!");
      } else {
        setUploadStatus("ERROR");
        alert("ERROR");
      }
    } catch (err) {
      alert("ERROR");
      console.log(err);
      window.location.reload();
    }
  };

  const handleModalButton = () => {
    if (uploadStatus === "SUCCESS!") {
      navigate("/dashboard");
    } else {
      setUploadPercentage(0);
      setUploadStatus("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="mt-36">
      <h1 className="pt-10 pb-10 text-slate-500 text-xl flex items-center justify-center">
        Fill out the short form and upload your video
      </h1>
      <form className="ml-72 grid grid-cols-2 gap-x-0 gap-8 items-center justify-center mx-auto ">
        <label className="block w-1/2 ">
          <span className="block text-md font-medium text-slate-700">
            Video Title <span style={{ color: "red" }}>*</span>
          </span>
          <input
            type="String"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
 
"
          />
        </label>
        <label className="block w-1/2">
          <span className="block text-md font-medium text-slate-700">
            Coach's Email <span style={{ color: "red" }}>*</span>
          </span>
          <input
            type="String"
            value={coachEmail}
            onChange={(e) => setCoachEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
 
"
          />
        </label>
        <label className="block w-1/2 ">
          <span className="block text-md font-medium text-slate-700">
            Competition Name
          </span>
          <input
            type="String"
            value={compName}
            onChange={(e) => setCompName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
 
"
          />
        </label>
        <label className="block w-1/2 ">
          <span className="block text-md font-medium text-slate-700">
            Round (e.g. Semi-Final, Final etc)
          </span>
          <input
            type="String"
            value={round}
            onChange={(e) => setRound(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
 
"
          />
        </label>
        <label className="block w-1/2">
          <span className="block text-md font-medium text-slate-700">
            Opponent Name
          </span>
          <input
            type="String"
            value={opponentName}
            onChange={(e) => setOpponentName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
 
"
          />
        </label>
        <label className="block w-1/2">
          <span className="block text-md font-medium text-slate-700">
            Video File <span style={{ color: "red" }}>*</span>
          </span>
          <input
            type="file"
            name="video"
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </label>
      </form>
      <div className="flex justify-center">
        <button
          onClick={sendUserVideo}
          className="mt-32 px-10 py-4 bg-sky-500 text-white text-lg font-semibold rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:bg-sky-600"
        >
          Submit
        </button>
      </div>
      {isModalOpen && (
        <div
          className="fixed z-50 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            {/* Modal content */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Sending Video...
                </h2>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: `${uploadPercentage}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                  <p className="text-center">{uploadPercentage}%</p>
                  <p className="text-center mt-4 text-md font-medium text-gray-900">
                    {uploadStatus}
                  </p>
                  {uploadStatus && (
                    <button
                      onClick={handleModalButton}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:bg-blue-600"
                    >
                      {uploadStatus === "SUCCESS!"
                        ? "Go to Dashboard"
                        : "Close"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendVideoContainer;
