import React from "react";

const CoachMsgAndInstructions = () => {
  return (
    <div className="mt-44">
      <h1 className=" text-slate-900 text-3xl font-semibold">
        Welcome to the coach dashboard! Osss {"\u{1F4Af}"}
        {"\u{1F4AA}"}
        {"\u{1F525}"}
      </h1>
      <ol className="list-decimal list-inside text-slate-500 text-sm pt-3">
        <li>Enter the Video ID from the email to gain access to the video</li>
        <li>Record and start video playback</li>
        <li>Provide commentary and annotations</li>
        <li>Send to your student</li>
      </ol>
    </div>
  );
};

export default CoachMsgAndInstructions;
