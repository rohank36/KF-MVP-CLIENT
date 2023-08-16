import React, { useState, useRef } from "react";
import RecordRTC from "recordrtc";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

const VideoAnnotation = ({
  videoID,
  videoTitle,
  setValidVideoID,
  setVideoID,
  setCoachName,
  setSignedUrl,
  setVideoTitle,
}) => {
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const recorder = useRef(null);
  const video_id = videoID;
  const video_title = videoTitle;

  const handleSend = async (e) => {
    setIsSending(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("video_id", video_id);
    formData.append("videoTitle", video_title);
    const fileInput = recordedBlob;
    formData.append("video", fileInput);

    try {
      const response = await axios.post(
        "https://kaizenflo-01afa622f2f4.herokuapp.com/api/videos/sendCoachVideo",
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
        alert("SUCCESS!");
        setValidVideoID(false);
        setVideoID("");
        setCoachName("");
        setSignedUrl("");
        setVideoTitle("");
        sessionStorage.setItem("videoIDAuth", false);
        sessionStorage.setItem("videoID", "");
        sessionStorage.setItem("coachName", "");
        sessionStorage.setItem("signedUrl", "");
        sessionStorage.setItem("videoTitle", "");
      } else {
        setUploadStatus("ERROR");
        alert("ERROR");
        console.log(resData);
      }
    } catch (err) {
      alert("ERROR");
      console.log(err);
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      selfBrowserSurface: "include",
      preferCurrentTab: true,
    });
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    stream.addTrack(audioStream.getAudioTracks()[0]);

    recorder.current = RecordRTC(stream, { type: "video" });
    recorder.current.startRecording();

    setRecording(true);
  };

  const stopRecording = async () => {
    recorder.current.stopRecording(() => {
      const blob = recorder.current.getBlob();
      setRecordedBlob(blob);
      setRecording(false);
      setIsOpen(true);
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePreview = () => {
    setIsOpen(true);
  };

  return (
    <div>
      {recording ? (
        <button
          className="mt-5 px-2 py-2 bg-sky-500 text-white text-lg font-semibold rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:bg-sky-600"
          onClick={stopRecording}
        >
          {"\u{26D4}"} Stop Recording
        </button>
      ) : (
        <div className="space-x-10">
          <button
            className="mt-5 px-2 py-2 bg-sky-500 text-white text-lg font-semibold rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:bg-sky-600"
            onClick={startRecording}
          >
            {"\u{1F3A5}"} Start Recording
          </button>
          {recordedBlob && !recording && (
            <button
              className="mt-5 px-2 py-2 bg-sky-500 text-white text-lg font-semibold rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:bg-sky-600"
              onClick={handlePreview}
            >
              {"\u{1F440}"} View Recording
            </button>
          )}
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        className="flex flex-col mx-auto my-10 w-3/5 h-3/5 rounded-lg border-2 shadow-2xl"
        overlayClassName="flex items-start justify-center fixed inset-0 bg-white z-50"
      >
        {isSending && recordedBlob && !recording && (
          <div
            className="fixed z-50 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

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
                        onClick={closeModal}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:bg-blue-600"
                      >
                        {uploadStatus === "SUCCESS!" && "End Session"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!isSending && recordedBlob && !recording && (
          <div>
            <h1 className="flex justify-center text-slate-500 text-2xl my-5">
              Click "Stop Sharing" at the top of your screen and Preview your
              recording...
            </h1>
            <video
              src={URL.createObjectURL(recordedBlob)}
              controls
              autoPlay
              className="border-4 border-blue-300"
            ></video>
            <div className="flex flex-row justify-center space-x-10 mb-6 p-6 rounded-lg shadow-2xl border-2">
              <button
                onClick={closeModal}
                className="mt-10 w-1/6 px-2 py-2 bg-sky-500 text-white text-lg font-semibold rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:bg-sky-600"
              >
                {"\u{274C}"} Close
              </button>
              <button
                onClick={handleSend}
                className="mt-10 w-1/6 px-2 py-2 bg-sky-500 text-white text-lg font-semibold rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:bg-sky-600"
              >
                {"\u{2705}"} Send
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VideoAnnotation;
