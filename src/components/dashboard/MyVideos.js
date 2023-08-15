import React from "react";
import ReactPlayer from "react-player";

const MyVideos = ({ propVideos }) => {
  return (
    <div className="pt-20">
      <h1 className="text-slate-900 text-xl font-semibold">
        {"\u{1F4FA}"} My Videos
      </h1>
      <h2 className="text-slate-500 text-md pt-3">
        {propVideos && propVideos.length > 0
          ? "Watch your videos with your coach's feedback"
          : "No Videos Available"}
      </h2>
      <h2 className="mt-4 text-slate-500 text-md p-3 border-2 border-solid border-blue-400 w-3/4 rounded-full">
        Search Bar to filter your videos is coming soon...
      </h2>
      <div className="flex flex-row flex-wrap mt-10 ">
        {propVideos &&
          propVideos.map((video, index) => (
            <div
              className="mx-10 mt-10 p-3 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform motion-safe:hover:scale-110 hover:ring-2 w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 px-2"
              key={index}
            >
              <ReactPlayer
                url={video.signedUrl}
                controls={true}
                width="100%"
                height="auto"
              />
              <h1 className="text-slate-900 text-lg font-semibold ">
                {video.videoTitle}
              </h1>
              <div className="text-slate-500 text-sm">
                {video.compName && <h2>Competition: {video.compName}</h2>}
                {video.round && <h2>Round: {video.round}</h2>}
                {video.opponentName && <h2>Opponent: {video.opponentName}</h2>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyVideos;
