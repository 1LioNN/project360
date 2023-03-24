import React from "react";
import Room from "../components/Room";
import Button from "../components/Button";
import { useState, useEffect, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import apiService from "../services/api-service.js";

function EditPage() {
  //const texture = useLoader(THREE.TextureLoader, img);
  const [models, setModels] = useState([]);
  const [position, setPosition] = useState([0, 0, 0]);

  const roomId = useParams().roomId;
  useEffect(() => {
    apiService.getItems(roomId).then((res) => {
      setModels(res.items.map(item => {
        return {
          ...item,
          position: item.coordinates,
          model: item.category
        }
      }));
    });
  }, [roomId]);

  const addModel = async (type) => {
    let pos = position;
    if (type === "table") {
      pos[1] = 0.6;
    }

    setPosition([position[0] + 3, position[1], position[2]]);
    apiService
      .createItem(roomId, type, pos)
      .then((res) => {
        const newItem = {
          ...res.item,
          model: res.item.category,
          position: res.item.coordinates
        }
        console.log("what's going on?!");
        setModels([...models, newItem])
        console.log(models);
      });
  };

  const deleteModel = () => {
    // delete most recent item
    const modelId = models[models.length - 1].id;
    apiService.deleteItem(roomId, modelId).then((res) => {
      const newModels = models.filter((model) => model.id !== modelId);
      setModels(newModels);
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-row flex-wrap m-0 h-full">
      <div className="basis-3/12 h-screen bg-gradient-to-br from-zinc-700 via-zinc-400 to-blue-100 ">
        <Button text={"Add"} onClick={() => addModel("bed")} />
        <Button text={"Add Table"} onClick={() => addModel("table")} />
        <Button text={"Delete"} onClick={() => deleteModel()} />
        <Link to="/dashboard"> Back </Link>
      </div>
      {<Room dimensions={[70, 30]} models={models} setModels={setModels} />}
    </div>
    </Suspense>
    
  );
}
export default EditPage;
