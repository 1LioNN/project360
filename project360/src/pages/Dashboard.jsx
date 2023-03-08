import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import RoomsContainer from "../components/RoomsContainer";
import CreateRoomForm from "../components/CreateRoomForm";
import { useState } from "react";

function Dashboard() {
  const [rooms, setRooms] = useState([]);

  return (
    <div className="flex flex-col m-0 h-full">
      <NavBar />
      <div className="flex flex-col flex-wrap m-0 h-full sm:flex-row">
        <Sidebar rooms={rooms} setRooms={setRooms} />
        <RoomsContainer rooms={rooms} setRooms={setRooms} />
      </div>
    </div>
  );
}

export default Dashboard;
