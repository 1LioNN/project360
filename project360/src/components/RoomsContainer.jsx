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
  }, [userId, setRooms]);


  const RoomsList = rooms.map((room) => {
    return <RoomCard name={room.name} id={room.id} key={room.id} userId={userId} rooms={rooms} setRooms={setRooms} />;
  });

  return (
    <div className="flex flex-row flex-wrap basis-10/12 p-4 pb-24 gap-4 content-start justify-center sm:justify-start sm:h-[calc(100%)] overflow-y-scroll no-scrollbar">
        {RoomsList}   
    </div>
  );
}

export default SideBar;
