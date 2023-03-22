import React from "react";
import logo from "../assets/icons/360.png";
import { Link } from "react-router-dom";

function RoomCard(props) {
  return (
    <Link className="h-64 w-72 rounded-2xl border-neutral-700 border-2 box-border relative overflow-hidden bg-neutral-800" to={'/edit/'+props.id}>
      <div className="flex flex-col h-64 w-72 overflow-hidden ">
        <img
          className=" overflow-hidden opacity-50 object-contain"
          src={logo}
          alt="Logo"
        />
        <div className="basis-2/6 object-contain bg-gradient-to-t from-black to-transparent p-3 text-white font-bold text-xl">
          {props.name}
        </div>
      </div>
    </Link>
  );
}

export default RoomCard;
