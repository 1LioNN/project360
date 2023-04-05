import React from "react";
import RoomCard from "./RoomCard";
import { useAuth0 } from "@auth0/auth0-react";
import apiService from "../services/api-service.js";
import SkeletonCard from "./SkeletonCard";
import PageButtons from "./PageButtons";
import { useEffect, useState } from "react";

function RoomsContainer({ userId, rooms, setRooms, filter, page, setPage }) {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);

  const skeletons = [...Array(15).keys()].map((i) => {
    return { id: i };
  });

  useEffect(() => {
    if (!userId) {
      return;
    }

    getAccessTokenSilently()
      .then((accessToken) =>
        apiService.getRooms(accessToken, userId, filter, page, 15)
      )
      .then((res) => {
        // ADd the new rooms to the existing ones
        setRooms((rooms) => [...rooms, ...res.items]);
        setLoading(false);
      });
  }, [userId, getAccessTokenSilently, setRooms, filter, page]);

  useEffect(() => {
    if (rooms.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [rooms]);

  const handleScroll = (e) => {
    const target = e.target;
    if ((target.scrollHeight - target.scrollTop == target.clientHeight) || (page === 0 && target.clientWidth > 640)) {
      console.log("bottom");
      setPage(page + 1);
    }
  };

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
    if (!empty) {
      return (
          <div className="flex flex-row flex-wrap basis-10/12 p-4 pb-24 gap-4 content-start justify-center sm:justify-start sm:h-[calc(100% - 80%)] overflow-y-scroll no-scrollbar relative"
          onScroll={(e)=> handleScroll(e)}>
            {RoomsList}
          </div>

      );
    } else {
      return (
        <div className="flex flex-row flex-wrap basis-10/12 p-4 pb-24 gap-4 content-start justify-center sm:justify-start sm:h-[calc(100%)] overflow-y-scroll no-scrollbar relative">
          THERES NOTHING HERE
        </div>
      );
    }
  } else {
    return (
      <div className="flex flex-row flex-wrap basis-10/12 p-4 pb-24 sm:pb-4 gap-4 content-start justify-center sm:justify-start sm:h-[calc(100%)] overflow-y-scroll no-scrollbar">
        {SkeletonList}
      </div>
    );
  }
}

export default RoomsContainer;
