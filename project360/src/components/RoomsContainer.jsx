import React from "react";
import RoomCard from "./RoomCard";
import { useEffect } from "react";
import apiService from "../services/api-service.js";

function SideBar({ userId, rooms, setRooms }) {
  useEffect(() => {
    if (!userId) {
      return;
    }
    apiService.getRooms(userId).then((res) => {
      setRooms(res.items);
    });
  }, [userId]);


  const RoomsList = rooms.map((room) => {
    return <RoomCard name={room.name} id={room.id} key={room.id}/>;
  });

  //CSS CURRENTLY NOT WORKING AS INTENDED CAN'T FIT OVERFLOW ROOMS (EASY FIX IS TO SWITCH TO OFFSET LIMIT PAGINATION)
  return (
    <div className="flex flex-row flex-wrap basis-10/12 p-6 gap-4 content-start justify-center sm:justify-start sm:h-[calc(100%-55px)] overflow-y-scroll no-scrollbar">
        {RoomsList}   
    </div>
  );
}

export default SideBar;
