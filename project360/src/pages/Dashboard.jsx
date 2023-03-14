import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import RoomsContainer from "../components/RoomsContainer";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import apiService from "../services/api-service.js";

function Dashboard() {
  const { user } = useAuth0();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    apiService.signIn(user.sub).then((res) => {
      setUserId(res.userId);
    });
  }, [user]);

  const [rooms, setRooms] = useState([]);
  
  return (
    <div className="flex flex-col m-0 h-full">
      <NavBar />
      <div className="flex flex-col flex-wrap m-0 h-full sm:flex-row">
        <Sidebar userId={userId} rooms={rooms} setRooms={setRooms} />
        <RoomsContainer userId={userId} rooms={rooms} setRooms={setRooms} />
      </div>
    </div>
  );
}

export default Dashboard;
