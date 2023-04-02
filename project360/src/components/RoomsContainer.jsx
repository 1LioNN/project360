import React from "react";
import RoomCard from "./RoomCard";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import apiService from "../services/api-service.js";

function RoomsContainer({ userId, rooms, setRooms }) {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!userId) {
      return;
    }

    getAccessTokenSilently()
      .then((accessToken) => apiService.getRooms(accessToken, userId))
      .then((res) => {
        setRooms(res.items);
      });
  }, [userId, getAccessTokenSilently]);

  const RoomsList = rooms.map((room) => {
    return (
      <RoomCard
        name={room.name}
        id={room.id}
        key={room.id}
        userId={userId}
        rooms={rooms}
        setRooms={setRooms}
      />
    );
  });

  //CSS CURRENTLY NOT WORKING AS INTENDED CAN'T FIT OVERFLOW ROOMS (EASY FIX IS TO SWITCH TO OFFSET LIMIT PAGINATION)
  return (
    <div className="flex flex-row flex-wrap basis-10/12 p-6 gap-4 content-start justify-center sm:justify-start sm:h-[calc(100%-55px)] overflow-y-scroll no-scrollbar">
      {RoomsList}
    </div>
  );
}

export default RoomsContainer;
