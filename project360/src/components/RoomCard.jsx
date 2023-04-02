import React from "react";
import logo from "../assets/icons/360.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import apiService from "../services/api-service";
import Popup from "reactjs-popup";
import { useState, useRef } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function RoomCard(props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const optionsRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //Fake loading
    setTimeout(() => {
      console.log(email);
      setLoading(false);
      setEmail("");
    }, 1000);
  };

  const deleteRoom = () => {
    apiService.deleteRoom(props.userId, props.id).then((res) => {
      const newRooms = props.rooms.filter((room) => room.id !== props.id);
      props.setRooms(newRooms);
    });
  };

  const onOpen = () => {
    optionsRef.current.classList.remove("translate-x-full");
  };

  const onClose = () => {
    setEmail("");
    optionsRef.current.classList.add("translate-x-full");
  };

  return (
    <div className="h-[15.7rem] w-72 rounded-2xl border-neutral-700 border-2 box-border overflow-hidden bg-neutral-800 hover:scale-[1.05] transition-all duration-300 relative group">
      <div className="flex flex-col h-64 w-72 overflow-hidden">
        <img
          className=" overflow-hidden opacity-50 object-contain duration-300 group-hover:translate-y-5"
          src={logo}
          alt="Logo"
        />
        <div className="basis-2/6 object-contain bg-gradient-to-t from-black to-transparent p-3 overflow-hidden text-white font-bold text-xl transition-all duration-300 translate-y-0 group-hover:translate-y-full">
          {props.name}
        </div>
        <div
          className="flex flex-col flex-grow justify-evenly absolute top-0 right-0 bg-gradient-to-l from-black to-transparent text-3xl p-3 text-white h-full transition-all duration-300 translate-x-full group-hover:translate-x-0 gap-6 w-24"
          ref={optionsRef}
        >
          <Link className="text-center group" to={`/edit/${props.id}`}>
            <FontAwesomeIcon icon={faPenToSquare} title="Edit" />
          </Link>
          <button onClick={deleteRoom}>
            <FontAwesomeIcon icon={faTrash} title="Delete" />
          </button>
          <Popup
            trigger={
              <button>
                <FontAwesomeIcon icon={faShareFromSquare} title="Invite" />
              </button>
            }
            modal
            nested
            onClose={() => onClose()}
            onOpen={() => {
              onOpen();
            }}
          >
            {(close) => (
              <div className="modal bg-neutral-900 p-7 w-[30rem] rounded-xl  font-semibold">
                <button
                  className="flex ml-auto text-white text-xl "
                  onClick={close}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="header text-white text-2xl">
                  Share your room
                </div>
                <form onSubmit={onSubmit} className="content flex flex-col">
                  <label className="mt-5 text-white">Email Address</label>
                  <input
                    className="w-[26rem] h-10 rounded-xl border-2 border-neutral-800 p-2"
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="flex flex-row justify-center mt-5">
                    {!loading ? (
                      <button
                        type="submit"
                        className="bg-indigo-900 w-32 hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800 rounded-xl p-2 font-bold text-white"
                      >
                        Share
                      </button>
                    ) : (
                      <div className="flex bg-indigo-900 w-32 hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800 rounded-xl p-2 font-bold text-white cursor-pointer justify-center">
                        Processing...
                      </div>
                    )}
                  </div>
                </form>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
