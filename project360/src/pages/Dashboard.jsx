import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import RoomsContainer from "../components/RoomsContainer";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import apiService from "../services/api-service.js";

function Dashboard() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userId, setUserId] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getAccessTokenSilently()
      .then((accessToken) => {
        if (!isMounted) {
          return;
        }
        return apiService.storeEmail(accessToken, user.email);
      })
      .then((res) => {
        if (!isMounted) {
          return;
        }
        setUserId(res.userId);
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <div className="flex flex-col m-0 h-full overflow-hidden">
      <NavBar />
      <div className="flex flex-col flex-wrap m-0 h-full sm:flex-row">
        <Sidebar userId={userId} rooms={rooms} setRooms={setRooms} />
        <RoomsContainer userId={userId} rooms={rooms} setRooms={setRooms} />
      </div>
    </div>
  );
}

export default Dashboard;
