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
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const filterParam = useParams().filter;
  const [filter, setFilter] = useState(filterParam || "my-rooms");
  const [page, setPage] = useState(0);
  const validFilters = ["my-rooms", "shared-with-me"];

  useEffect(() => {
    setFilter(filterParam);
  }, [filterParam]);

  useEffect(() => {
    let isMounted = true;
    const manageEmail = async () => {
      const accessToken = await getAccessTokenSilently();
      if (!isMounted) {
        return;
      }

      apiService
        .storeEmail(accessToken, user.email)
        .then((res) =>
          apiService.updateEmail(accessToken, user.email, user.sub)
        )
        .then((res) => {
          if (!isMounted) {
            return;
          }

          setUserId(res.userId);
        });
    };

    manageEmail();

    return () => {
      isMounted = false;
    };
  }, [user]);

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
            <RoomsContainer
              userId={userId}
              rooms={rooms}
              setRooms={setRooms}
              filter={filter}
              page={page}
              setPage={setPage}
            />
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
