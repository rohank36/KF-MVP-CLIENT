import React from "react";

const DashWelcomeMsg = ({ propFirstName, propAuth }) => {
  return (
    <div className="">
      <h1 className=" text-slate-900 text-4xl font-semibold">
        Welcome to your dashboard, {propFirstName}. Osss {"\u{1F4Af}"}
        {"\u{1F4AA}"}
        {"\u{1F525}"}
      </h1>
    </div>
  );
};

export default DashWelcomeMsg;
