import React from "react";
import RoomCard from "./RoomCard";
import SkeletonCard from "./SkeletonCard";
import { useEffect, useState } from "react";
import apiService from "../services/api-service.js";

function RoomsContainer({ userId, rooms, setRooms }) {
  const [loading, setLoading] = useState(true);
  const skeletons = [...Array(15).keys()].map((i) => {
    return { id: i };
  });

  useEffect(() => {
    if (!userId) {
      return;
    }
    apiService.getRooms(userId).then((res) => {
      setRooms(res.items);
      setLoading(false);
    });
  }, [userId, setRooms]);

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

  const SkeletonList = skeletons.map((i) => {
    return <SkeletonCard key={i.id} />;
  });

  if (!loading) {
    return (
      <div className="flex flex-row flex-wrap basis-10/12 p-4 pb-24 gap-4 content-start justify-center sm:justify-start sm:h-[calc(100%)] overflow-y-scroll no-scrollbar">
        {RoomsList}
      </div>
    );
  } else {
    return (
      <div className="flex flex-row flex-wrap basis-10/12 p-4 pb-24 gap-4 content-start justify-center sm:justify-start sm:h-[calc(100%)] overflow-y-scroll no-scrollbar">
        {SkeletonList}
      </div>
    );
  }
}

export default RoomsContainer;
