import React from "react";
import Room from "../components/Room";
import { useState, useEffect, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import apiService from "../services/api-service.js";
import EditSideBar from "../components/EditSideBar";

function EditPage() {
  //const texture = useLoader(THREE.TextureLoader, img);
  const [models, setModels] = useState([]);
  const [position, setPosition] = useState([0, 0, 0]);
  const roomId = useParams().roomId;

  useEffect(() => {
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
        {<Room dimensions={[70, 30]} models={models} />}
      </div>
    </Suspense>
  );
}
export default EditPage;
