import React from "react";
import Room from "../components/Room";
import { useState, useEffect, Suspense, useRef } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/api-service.js";
import EditSideBar from "../components/EditSideBar";
import { socket } from "../socketConnect";
import io from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";
import Error from "../components/Error";
import NavBar from "../components/NavBar";

function EditPage() {
  const { isAuthenticated } = useAuth0();
  const [models, setModels] = useState([]);
  const [position, setPosition] = useState([0, 0, 0]);
  const [dimensions, setDimensions] = useState(null);
  const [roomName, setRoomName] = useState("New Room");
  const roomId = useParams().roomId;
  const [errorCode, setErrorCode] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const myId = useRef();

  useEffect(() => {
    socket.current = io();

    function onConnect() {
      console.log("connected");
    }
    socket.on("connect", onConnect);

    apiService
      .getMe()
      .then((res) => apiService.getRoom(res.userId, roomId))
      .then((res) => {
        setDimensions(res.room.dimensions.map((x) => parseFloat(x)));
        setRoomName(res.room.name);
      })
      .catch((err) => {
        setErrorCode(404);
        isAuthenticated ? setRedirect("/dashboard/my-rooms") : setRedirect("/");
      });

    apiService.getItems(roomId).then((res) => {
      setModels(
        res.items.map((item) => {
          return {
            ...item,
            position: item.coordinates,
            model: item.category,
          };
        })
      );
    });

    socket.on("updateRoom", (data) => {
      console.log("Listening to updateRoom");

      apiService.getItems(data.roomId).then((res) => {
        console.log(res);
        const val = res.items.map((item) => {
          return {
            ...item,
            position: item.coordinates,
            model: item.category,
          };
        });
        setModels(val);
      });
    });

    socket.current.on("id", (id) => {
      myId.current = id;
    });
    return () => {
      console.log("in useSocketIO return");
      socket.current.off("id");
      // socket.current.off('clients')
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
  } else {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col sm:flex-row flex-wrap m-0 h-full">
          <EditSideBar
            roomId={roomId}
            position={position}
            setPosition={setPosition}
            models={models}
            setModels={setModels}
            name={roomName}
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
      </Suspense>
    );
  }
}

export default EditPage;
