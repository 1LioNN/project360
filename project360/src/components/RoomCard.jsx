import React from "react";
import logo from "../icons/360.png";

function RoomCard(props) {
  return (
    <div className="h-64 w-72 rounded-2xl border-neutral-700 border-2 box-border">
      <div className="flex flex-col h-64 w-72 overflow-hidden ">
        <img
          className=" overflow-hidden opacity-50 object-contain"
          src={logo}
        />
        <div className="basis-2/6 object-contain bg-transparent p-3 text-white font-bold text-xl">
          {props.name}
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
