import React from "react";
import Room from "../components/Room";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import apiService from "../services/api-service.js";

function EditPage() {
  //dummy api calls
  const [models, setModels] = useState([]);
  const [position, setPosition] = useState([0, 0, 0]);

  const roomId = useParams().roomId;

  useEffect(() => {
    apiService.getItems(roomId).then((res) => setModels(res.items));
  }, [models, roomId]);

  const addModel = async (type) => {
    let pos = position;
    if (type === "table") {
      pos[1] = 0.6;
    }

    setPosition([position[0] + 3, position[1], position[2]]);
    apiService
      .createItem(roomId, type, pos)
      .then((res) => setModels([...models, res.item]));
  };

  const deleteModel = async () => {
    // delete most recent item
    const modelId = models[models.length - 1].id;
    apiService.deleteItem(roomId, modelId).then((res) => {
      const newModels = models.filter((model) => model.id !== modelId);
      setModels(newModels);
    });
  };

  return (
    <div className="flex flex-row flex-wrap m-0 h-full">
      <div className="basis-3/12 h-screen bg-gradient-to-br from-zinc-700 via-zinc-400 to-blue-100 ">
        <Button text={"Add"} onClick={() => addModel("bed")} />
        <Button text={"Add Table"} onClick={() => addModel("table")} />
        <Button text={"Delete"} onClick={() => deleteModel()} />
        <Link to="/dashboard"> Back </Link>
      </div>
      <Room dimensions={[70, 30]} models={models} />
    </div>
  );
}
export default EditPage;
