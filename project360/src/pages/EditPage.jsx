import React from "react";
import Room from "../components/Room";
import { useState, useEffect, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import apiService from "../services/api-service.js";
import EditSideBar from "../components/EditSideBar";

function EditPage() {
  const [models, setModels] = useState([]);
  const [position, setPosition] = useState([0, 0, 0]);
  const [dimensions, setDimensions] = useState(null);
  const roomId = useParams().roomId;

  useEffect(() => {
    apiService
      .getMe()
      .then((res) => apiService.getRoom(res.userId, roomId))
      .then((res) => {
        setDimensions(res.room.dimensions);
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
        {dimensions ? <Room dimensions={dimensions} models={models} /> : ``}
      </div>
    </Suspense>
  );
}
export default EditPage;
