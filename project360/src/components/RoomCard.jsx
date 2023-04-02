import React from "react";
import logo from "../assets/icons/360.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import apiService from "../services/api-service";
import audioService from "../services/audio-service";

function RoomCard(props) {
  const playSound = () => {
    audioService.playJoinSound(0.08);
  };

  const deleteRoom = () => {
    apiService.deleteRoom(props.userId, props.id).then((res) => {
      const newRooms = props.rooms.filter((room) => room.id !== props.id);
      props.setRooms(newRooms);
    }
    );
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
        <div className="flex flex-col flex-grow justify-evenly absolute top-0 right-0 bg-gradient-to-l from-black to-transparent text-3xl p-3 text-white h-full transition-all duration-300 translate-x-full group-hover:translate-x-0 gap-6 w-24">
          <Link className="text-center group" to={`/edit/${props.id}`} onClick={()=> playSound()}>
            <FontAwesomeIcon icon={faPenToSquare} title="Edit" />
          </Link>
          <button onClick={deleteRoom}>
            <FontAwesomeIcon icon={faTrash} title="Delete" />
          </button>
          <button>
            <FontAwesomeIcon icon={faShareFromSquare} title="Invite" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
