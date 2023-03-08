import React from "react";
import RoomCard from "./RoomCard";

function SideBar() {
  //Dummy Api data to get rooms, refer to EditPage.jsx for info on useEffect rerendering

  const Rooms = [
    {
      name: "Room 1",
      id : 1
    },
    {
        name: "Room 2",
        id: 2
    },
    {
        name: "Room 3",
        id: 3
    },
    {
        name: "Room 4",
        id: 4
    },
    {
        name: "Room 1",
        id: 5
      },
      {
          name: "Room 2",
            id: 6
      },
      {
          name: "Room 3",
            id: 7
      },
      {
          name: "Room 4",
            id: 8
      },
      {
        name: "Room 1",
        id: 9
      },
      {
          name: "Room 2",
            id: 10
      },
      {
          name: "Room 3",
            id: 11
      },
      {
          name: "Room 4",
            id: 12
      }
      ,
      {
        name: "Room 2",
          id: 13
    },
    {
        name: "Room 3",
          id: 14
    },
    {
        name: "Room 4",
          id: 15
    },
  ];

  const RoomsList = Rooms.map((room) => {
    return <RoomCard name={room.name} id={room.id} key={room.id}/>;
  });

  //CSS CURRENTLY NOT WORKING AS INTENDED CAN'T FIT OVERFLOW ROOMS (EASY FIX IS TO SWITCH TO OFFSET LIMIT PAGINATION)
  return (
    <div className="flex flex-row flex-wrap gap-5 p-5 basis-11/12 justify-center sm:basis-10/12 overflow-y-auto no-scrollbar">
        {RoomsList}
    </div>
  );
}

export default SideBar;
