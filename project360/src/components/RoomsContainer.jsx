import React from "react";
import RoomCard from "./RoomCard";
import { useEffect } from "react";
import apiService from "../services/api-service.js";

function SideBar({ rooms, setRooms }) {
  useEffect(() => {
    apiService
      .getMe()
      .then((res) => apiService.getRooms(res.userId))
      .then((res) => {
        setRooms(res.items)
      });
  }, [rooms]);

  const RoomsList = rooms.map((room) => {
    return <RoomCard name={room.name} id={room.id} key={room.id} />;
  });

  //CSS CURRENTLY NOT WORKING AS INTENDED CAN'T FIT OVERFLOW ROOMS (EASY FIX IS TO SWITCH TO OFFSET LIMIT PAGINATION)
  return (
    <div className="flex flex-row flex-wrap gap-5 p-5 basis-11/12 justify-center sm:basis-10/12 overflow-y-auto no-scrollbar">
      {RoomsList}
    </div>
  );
}

export default SideBar;
