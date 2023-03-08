import React from "react";
import Button from "./Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SideBar() {
  return (
    <div className="flex flex-row basis-1/12 overflow-hidden flex-grow items-center justify-evenly text-gray-50 bg-gradient-to-b from-black via-neutral-900 to-black sm:basis-2/12 sm:justify-start sm:flex-col sm:border-r sm:border-neutral-800">
      <button
        className={
          "border-indigo-500 rounded-xl border-solid border p-3 pt-5 pb-5 bg-indigo-900 m-6 w-5/6 hover:bg-gradient-to-br font-bold from-blue-300 via-indigo-400 to-indigo-800"
        }
      >
        <div className="flex flex-row items-center justify-center">
          <FontAwesomeIcon className="sm:mr-3" icon={faPlus} />{" "}
          <span className="hidden sm:block">Create New Room</span>
        </div>
      </button>

      <div className="flex flex-row gap-20 m-10 sm:flex-col sm:gap-5 sm:ml-7 sm:mt-5">
        <div className="flex flex-row text-xl font-semibold items-center p-5  rounded-full hover:bg-neutral-800">
          <FontAwesomeIcon
            className="sm:mr-4 text-3xl sm:text-2xl"
            icon={faCube}
          />{" "}
          <span className="hidden sm:block">My Rooms</span>
        </div>
        <div className="flex flex-row text-xl font-semibold items-center p-5  rounded-full hover:bg-neutral-800">
          <FontAwesomeIcon
            className="sm:mr-4 text-3xl sm:text-2xl"
            icon={faUsers}
          />{" "}
          <span className="hidden sm:block">Shared with Me</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
