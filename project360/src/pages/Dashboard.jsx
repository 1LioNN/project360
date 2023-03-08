import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import RoomsContainer from "../components/RoomsContainer";
import CreateRoomForm from "../components/CreateRoomForm";

function Dashboard() {
  // define use states for rooms
  // pass it over to the two sibling components

  return (
    <div className="flex flex-col m-0 h-full">
      <NavBar />
      <div className="flex flex-col flex-wrap m-0 h-full sm:flex-row">
        <Sidebar />
        <RoomsContainer />
      </div>
    </div>
  );
}

export default Dashboard;
