import React from "react";

function Loading() {
  return (
    <div className="flex flex-col gap-24 justify-center items-center h-screen w-screen absolute top-0 left-0 ">
      <div className="cube animate-[spincube_3s_ease-out_infinite] mr-6">
        <div className="cube-face cube-front"></div>
        <div className="cube-face cube-back"></div>
        <div className="cube-face cube-right"></div>
        <div className="cube-face cube-left"></div>
        <div className="cube-face cube-bottom"></div>
        <div className="cube-face cube-top"></div>
      </div>
      <div className="text-4xl text-white font-bold animate-loading cpath-0-3-0-0 inline-block pb-2">
        Loading...
      </div>
    </div>
  );
}

export default Loading;
