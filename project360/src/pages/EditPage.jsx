import React from "react";
import Room from "../components/Room";
import { useState, useEffect, Suspense, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import apiService from "../services/api-service.js";
import EditSideBar from "../components/EditSideBar";
import { socket } from "../socketConnect";
import io from "socket.io-client";

function EditPage() {
  const [models, setModels] = useState([]);
  const [position, setPosition] = useState([0, 0, 0]);
  const [dimensions, setDimensions] = useState(null);
  const [pos, setPos] = useState(position);
  const roomId = useParams().roomId;

  const myId = useRef();

  console.log("Pony"); 
  console.log(models); 
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
      console.log(data);

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
        console.log("val"); 
        console.log(val); 
        console.log("Vanshika"); 
        console.log(models); 
      });


    });

    socket.current.on("id", (id) => {
      console.log("myId = " + id);
      myId.current = id;
    });

    return () => {
      console.log("in useSocketIO return");
      // clearInterval(intervalId)
      socket.current.off("id");
      // socket.current.off('clients')
      // socket.current.off('removeClient')
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
