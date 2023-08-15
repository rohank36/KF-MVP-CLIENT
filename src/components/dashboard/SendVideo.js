import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SendVideo = () => {
  const [coachEmail, setCoachEmail] = useState();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/sendvideo");
  };

  return (
    <div className="pt-32">
      <h1 className="text-slate-900 text-xl font-semibold">
        {"\u{1F4F9}"} Send Video
      </h1>

      <ol className="list-decimal list-inside text-slate-500 text-md pt-3">
        <li>Click the upload and send button</li>
        <li>Fill out the short form</li>
        <li>Hit submit and wait for your coach to review it</li>
        <li>
          The annotated video will appear in your library once your coach sends
          it back
        </li>
      </ol>

      <button
        className="mt-6 block  px-4 py-3 text-white font-semibold bg-sky-500  border border-slate-300 rounded-md text-sm shadow-md placeholder-slate-500 placeholder:text-md
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 hover:bg-sky-600"
        onClick={handleClick}
      >
        Upload and Send
      </button>
    </div>
  );
};

export default SendVideo;
