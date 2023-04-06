import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import { useState } from "react";
import apiService from "../services/api-service.js";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function SideBar({ userId, rooms, setRooms, filter, setFilter }) {
  const { getAccessTokenSilently } = useAuth0();
  const [roomName, setRoomName] = useState("New Room");
  const [width, setWidth] = useState(10);
  const [length, setLength] = useState(10);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    getAccessTokenSilently()
      .then((accessToken) =>
        apiService.createRoom(accessToken, userId, roomName, [
          parseFloat(width),
          parseFloat(length),
        ])
      )
      .then((res) => {
        const newRoom = {
          id: res.room.id,
          name: res.room.name,
          dimensions: res.room.dimensions,
        };
        setRoomName("New Room");
        setWidth(10);
        setLength(10);
        setRooms([...rooms, newRoom]);
        setLoading(false);
        navigate(`/edit/${res.room.id}`);
      });
  };

  const onFilter = (f, url) => {
    setFilter(f);
    navigate(url);
  };

  const onClose = () => {
    setRoomName("New Room");
    setWidth(10);
    setLength(10);
  };

  return (
    <div className="flex flex-row flex-auto basis-2/12 overflow-hidden flex-grow items-center justify-evenly text-gray-50 bg-gradient-to-b from-black via-neutral-900 to-black sm:basis-2/12 sm:justify-start sm:flex-col sm:border-r sm:border-neutral-800">
      <Popup
        trigger={
          <button
            className={
              "border-indigo-500 rounded-xl border-solid border p-3 pt-5 pb-5  bg-indigo-900 m-6 sm:w-5/6 w-24 hover:bg-gradient-to-br font-bold from-blue-300 via-indigo-400 to-indigo-800"
            }
          >
            <div className="flex flex-row items-center justify-center">
              <FontAwesomeIcon className="sm:mr-3" icon={faPlus} />
              <span className="hidden sm:block">Create New Room</span>
            </div>
          </button>
        }
        modal
        nested
        onClose={() => onClose()}
      >
        {(close) => (
          <div className="modal bg-[#111111] p-10 pt-7 rounded-xl  font-semibold">
            <button
              className="flex ml-auto text-white text-xl "
              onClick={close}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="header text-white text-2xl"> Create New Room </div>
            <form onSubmit={onSubmit} className="content flex flex-col">
              <label className="mt-5 text-white">Room Name</label>
              <input
                className="w-80 h-10 rounded-xl border-2 border-neutral-800 p-2"
                type="text"
                placeholder="Room Name"
                minLength={1}
                maxLength={20}
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <label className="mt-5 text-white">Length (min. 10)</label>
              <input
                className="mt-5 w-80 h-10 rounded-xl border-2 border-neutral-800 p-2"
                type="number"
                min="10"
                max="100"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label className="mt-5 text-white">Width (min. 10)</label>
              <input
                className="mt-5 w-80 h-10 rounded-xl border-2 border-neutral-800 p-2"
                type="number"
                min="10"
                max="100"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
              <div className="flex flex-row justify-center mt-5">
                {!loading ? (
                  <button
                    type="submit"
                    className="p-3 bg-indigo-900 w-28 hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800 rounded-xl font-bold text-white"
                  >
                    Create
                  </button>
                ) : (
                  <div className="flex bg-indigo-900 w-28 hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800 rounded-xl p-2 font-bold text-white cursor-pointer justify-center">
                    Loading...
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </Popup>

      {filter !== "my-rooms" ? (
        <div
          className="flex flex-row text-xl font-semibold items-center p-5 m-3 sm:pl-10 rounded-full cursor-pointer sm:w-full hover:bg-neutral-800"
          onClick={() => onFilter("my-rooms", "/dashboard/my-rooms")}
        >
          <FontAwesomeIcon
            className="sm:mr-4 text-3xl sm:text-2xl"
            icon={faCube}
          />
          <span className="hidden sm:block">My Rooms</span>
        </div>
      ) : (
        <div
          className="flex flex-row text-xl font-semibold items-center p-5 m-3 sm:pl-10 rounded-full cursor-pointer sm:w-full hover:bg-neutral-800 text-indigo-900"
          onClick={() => onFilter("my-rooms", "/dashboard/my-rooms")}
        >
          <FontAwesomeIcon
            className="sm:mr-4 text-3xl sm:text-2xl"
            icon={faCube}
          />
          <span className="hidden sm:block">My Rooms</span>
        </div>
      )}
      {filter !== "shared-with-me" ? (
        <div
          className="flex flex-row text-xl font-semibold items-center p-5 m-3 sm:pl-10 rounded-full cursor-pointer sm:w-full hover:bg-neutral-800"
          onClick={() =>
            onFilter("shared-with-me", "/dashboard/shared-with-me")
          }
        >
          <FontAwesomeIcon
            className="sm:mr-4 text-3xl sm:text-2xl"
            icon={faUsers}
          />
          <span className="hidden sm:block">Shared with Me</span>
        </div>
      ) : (
        <div
          className="flex flex-row text-xl font-semibold items-center p-5 m-3 sm:pl-10 rounded-full cursor-pointer sm:w-full hover:bg-neutral-800 text-indigo-900"
          onClick={() =>
            onFilter("shared-with-me", "/dashboard/shared-with-me")
          }
        >
          <FontAwesomeIcon
            className="sm:mr-4 text-3xl sm:text-2xl"
            icon={faUsers}
          />
          <span className="hidden sm:block">Shared with Me</span>
        </div>
      )}
    </div>
  );
}

export default SideBar;
