import React from "react";
import Room from "../components/Room";
import { useState, useEffect, Suspense, useRef } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/api-service.js";
import EditSideBar from "../components/EditSideBar";
import { socket } from "../socketConnect";
import io from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";

function EditPage() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [models, setModels] = useState([]);
  const [position, setPosition] = useState([0, 0, 0]);
  const [dimensions, setDimensions] = useState(null);
  const [roomName, setRoomName] = useState("New Room");
  const roomId = useParams().roomId;
  const myId = useRef();

  useEffect(() => {
    let isMounted = true;

    getAccessTokenSilently().then((accessToken) => {
      if (!isMounted) {
        return;
      }
      apiService.storeEmail(accessToken, user.email);
    });

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
        });

      console.log("HI is the ROOM ID" + roomId)
      apiService.getItems(accessToken, roomId).then((res) => {
        if (!isMounted) {
          return;
        }
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
    };

    callAPI();

    return () => {
      isMounted = false;
    };
  }, [roomId, getAccessTokenSilently]);

  useEffect(() => {
    let isMounted = true;
    socket.current = io();

    function onConnect() {
      console.log("connected");
    }
    socket.on("connect", onConnect);

    socket.on("updateRoom", (data) => {
      console.log("Listening to updateRoom");

      getAccessTokenSilently()
        .then((accessToken) => {
          if (!isMounted) {
            return;
          }
          return apiService.getItems(accessToken, roomId);
        })
        .then((res) => {
          if (!isMounted) {
            return;
          }
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
      isMounted = false;
      // socket.current.off('clients')
    };
  }, [roomId]);

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
          <Room dimensions={dimensions} models={models} setModels={setModels} />
        ) : (
          ``
        )}
      </div>
    </Suspense>
  );
}

export default EditPage;
