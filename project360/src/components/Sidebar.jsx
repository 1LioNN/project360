import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import { useState } from "react";
import apiService from "../services/api-service.js";

function SideBar({ rooms, setRooms }) {
  const [roomName, setRoomName] = useState("");
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    //log form data
    console.log(roomName);
    console.log(width);
    console.log(length);
    //reset form
    setRoomName("");
    setWidth(0);
    setLength(0);

    apiService
      .getMe()
      .then((res) =>
        apiService.createRoom(res.userId, roomName, [width, length])
      )
      .then((res) => {
        setRooms([...rooms, res.room]);
      });
  };

  return (
    <div className="flex flex-row basis-1/12 overflow-hidden flex-grow items-center justify-evenly text-gray-50 bg-gradient-to-b from-black via-neutral-900 to-black sm:basis-2/12 sm:justify-start sm:flex-col sm:border-r sm:border-neutral-800">
      <Popup
        trigger={
          <button
            className={
              "border-indigo-500 rounded-xl border-solid border p-3 pt-5 pb-5 bg-indigo-900 m-6 sm:w-5/6 w-24 hover:bg-gradient-to-br font-bold from-blue-300 via-indigo-400 to-indigo-800"
            }
          >
            <div className="flex flex-row items-center justify-center">
              <FontAwesomeIcon className="sm:mr-3" icon={faPlus} />{" "}
              <span className="hidden sm:block">Create New Room</span>
            </div>
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal bg-neutral-800 p-10 rounded-xl  font-semibold">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header text-white"> Create New Room </div>
            <form onSubmit={onSubmit} className="content flex flex-col">
              <input
                className="w-80 h-10 rounded-xl border-2 border-neutral-800 p-2"
                type="text"
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <input
                className="mt-5 w-80 h-10 rounded-xl border-2 border-neutral-800 p-2"
                type="number"
                placeholder="eg. 10"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <input
                className="mt-5 w-80 h-10 rounded-xl border-2 border-neutral-800 p-2"
                type="number"
                placeholder="eg. 10"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
              <div className="flex flex-row justify-center mt-5">
                <button
                  type="submit"
                  className="bg-indigo-900 w-28 hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800 rounded-xl p-2 font-bold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        )}
      </Popup>

      <div className="flex flex-row gap-20 m-7 sm:flex-col sm:gap-5 sm:ml-7 sm:mt-5">
        <div className="flex flex-row text-xl font-semibold items-center p-5  rounded-full hover:bg-neutral-800">
          <FontAwesomeIcon
            className="sm:mr-4 text-3xl sm:text-2xl"
            icon={faCube}
          />
          <span className="hidden sm:block">My Rooms</span>
        </div>
        <div className="flex flex-row text-xl font-semibold items-center p-5  rounded-full hover:bg-neutral-800">
          <FontAwesomeIcon
            className="sm:mr-4 text-3xl sm:text-2xl"
            icon={faUsers}
          />
          <span className="hidden sm:block">Shared with Me</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
