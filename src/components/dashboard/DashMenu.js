import React from "react";

const DashMenu = ({
  propMenuOptions,
  myVideosRef,
  sendVideoRef,
  myAccountRef,
  headerRef,
}) => {
  const handleClick = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="fixed top-24 left-0 bottom-0 z-40 border-solid border-slate-300 h-screen pl-5 pr-20 pt-10 flex flex-col shadow-xl bg-white hover:bg-sky-500 transition-all duration-500 ease-in-out transform motion-safe">
      <button
        onClick={() => handleClick(myVideosRef)}
        className="text-slate-900 text-xl font-semibold hover:text-white transition-all duration-500 ease-in-out transform motion-safe"
      >
        {"\u{1F4FA}"} {propMenuOptions[0]}
      </button>
      <button
        onClick={() => handleClick(sendVideoRef)}
        className="text-slate-900 text-xl font-semibold pt-8 hover:text-white transition-all duration-500 ease-in-out transform motion-safe"
      >
        {"\u{1F4F9}"} {propMenuOptions[1]}
      </button>
      <button
        onClick={() => handleClick(myAccountRef)}
        className="text-slate-900 text-xl font-semibold pt-8 hover:text-white transition-all duration-500 ease-in-out transform motion-safe"
      >
        👤 {propMenuOptions[2]}
      </button>
      <button className="absolute bottom-28 text-slate-500 text-md hover:text-white transition-all duration-500 ease-in-out transform motion-safe">
        Terms & Privacy
      </button>
    </div>
  );
};

export default DashMenu;
