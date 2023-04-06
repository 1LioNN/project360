import React from "react";
import Room from "../components/Room";
import { useState, useEffect, Suspense, useRef } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/api-service.js";
import EditSideBar from "../components/EditSideBar";
import { socket } from "../socketConnect";
import { useAuth0 } from "@auth0/auth0-react";
import Error from "../components/Error";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import audioService from "../services/audio-service";

function EditPage() {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [models, setModels] = useState([]);
  const [position, setPosition] = useState([0, 0, 0]);
  const [dimensions, setDimensions] = useState(null);
  const [roomName, setRoomName] = useState("New Room");
  const roomId = useParams().roomId;
  const [errorCode, setErrorCode] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const myId = useRef();

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
        );
    };

    manageEmail();

    return () => {
      isMounted = false;
    };
  }, [user, getAccessTokenSilently]);

  useEffect(() => {
    let isMounted = true;

    const callAPI = async () => {
      const accessToken = await getAccessTokenSilently();
      if (!isMounted) {
        return;
      }

      apiService
        .getMe(accessToken)
        .then((res) => {
          if (!isMounted) {
            return;
          }
          return apiService.getRoom(accessToken, res.userId, roomId);
        })
        .then((res) => {
          setDimensions(res.room.dimensions.map((x) => parseFloat(x)));
          setRoomName(res.room.name);
          setLoadingRoom(false);
        })
        .catch((err) => {
          setLoadingRoom(false);
          setErrorCode(404);
          isAuthenticated
            ? setRedirect("/dashboard/my-rooms")
            : setRedirect("/");
        });

      apiService
        .getMe(accessToken)
        .then((res) => apiService.getItems(accessToken, res.userId, roomId))
        .then((res) => {
          if (!isMounted) {
            return;
          }
          setLoadingItems(false);
          setModels(
            res.items.map((item) => {
              return {
                ...item,
                position: item.coordinates,
                model: item.category,
              };
            })
          );
        })
        .catch((err) => {
          setLoadingRoom(false);
          setErrorCode(403);
          isAuthenticated
            ? setRedirect("/dashboard/my-rooms")
            : setRedirect("/");
        });
    };

    callAPI();

    return () => {
      isMounted = false;
    };
  }, [roomId, getAccessTokenSilently]);

  useEffect(() => {
    let isMounted = true;

    socket.on("updateRoom", () => {
      const getItems = async () => {
        const accessToken = await getAccessTokenSilently();
        apiService
          .getMe(accessToken)
          .then((res) => apiService.getItems(accessToken, res.userId, roomId))
          .then((res) => {
            if (!isMounted) {
              return;
            }
            setLoadingItems(false);
            setModels(
              res.items.map((item) => {
                return {
                  ...item,
                  position: item.coordinates,
                  model: item.category,
                };
              })
            );
          })
          .catch((err) => {
            setLoadingRoom(false);
            setErrorCode(403);
            isAuthenticated
              ? setRedirect("/dashboard/my-rooms")
              : setRedirect("/");
          });
      };
      getItems();
    });

    return () => {
      isMounted = false;
      socket.off("updateRoom");
    };
  }, [roomId, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col m-0 h-full overflow-hidden">
        <NavBar />
        <Error
          errorCode={401}
          errorDescription={"Please Log In or Sign Up to access this page."}
          errorMessage={"Unauthorized"}
          redirect={"/"}
        />
      </div>
    );
  } else if (errorCode === 404) {
    return (
      <div className="flex flex-col m-0 h-full overflow-hidden">
        <NavBar />
        <Error
          errorCode={errorCode}
          errorDescription={"The room you are trying to access does not exist."}
          errorMessage={"Not Found"}
          redirect={redirect}
        />
      </div>
    );
  } else if (errorCode === 403) {
    return (
      <div className="flex flex-col m-0 h-full overflow-hidden">
        <NavBar />
        <Error
          errorCode={errorCode}
          errorDescription={"You do not have permission to access this room."}
          errorMessage={"Forbidden"}
          redirect={redirect}
        />
      </div>
    );
  } else {
    return (
      <Suspense fallback={<Loading />}>
        {loadingRoom && loadingItems ? (
          <Loading />
        ) : (
          <div className="flex flex-col sm:flex-row m-0 h-full">
            <EditSideBar
              roomId={roomId}
              position={position}
              setPosition={setPosition}
              models={models}
              setModels={setModels}
              name={roomName}
              loadingRoom={loadingRoom}
              loadingItems={loadingItems}
            />
            {dimensions ? (
              <Room
                dimensions={dimensions}
                models={models}
                setModels={setModels}
              />
            ) : (
              ``
            )}
          </div>
        )}
      </Suspense>
    );
  }
}

export default EditPage;
