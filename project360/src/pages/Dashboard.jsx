import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Error from "../components/Error";
import RoomsContainer from "../components/RoomsContainer";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import apiService from "../services/api-service.js";
import { useParams } from "react-router-dom";

function Dashboard() {
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState(useParams().filter || "my-rooms");
  const validFilters = ["my-rooms", "shared-with-me"];

  console.log("DASHBOARD RENDERED");
  console.log(filter)
  let once = false;

  useEffect(() => {
    if (!user || once) {
      return;
    }
    once = true;
    apiService.signIn(user.sub).then((res) => {
      setUserId(res.userId);
    });
  }, []);

  return (
    <div className="flex flex-col m-0 h-full overflow-hidden">
      <NavBar />
      {isAuthenticated ? (
        validFilters.includes(filter) ? (
          <div className="flex flex-col flex-wrap m-0 h-full sm:flex-row">
            <Sidebar
              userId={userId}
              rooms={rooms}
              setRooms={setRooms}
              filter={filter}
              setFilter={setFilter}
            />
            <RoomsContainer userId={userId} rooms={rooms} setRooms={setRooms} />
          </div>
        ) : (
          <Error
            errorCode={404}
            errorDescription={
              "The page you are trying to access does not exist."
            }
            errorMessage={"Not Found"}
            redirect={"/dashboard/my-rooms"}
          />
        )
      ) : (
        <Error
          errorCode={401}
          errorDescription={"Please Log In or Sign Up to access this page."}
          errorMessage={"Unauthorized"}
          redirect={"/"}
        />
      )}
    </div>
  );
}

export default Dashboard;
