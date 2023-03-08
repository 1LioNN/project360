import React from "react";
import Room from "../components/Room";
import Button from "../components/Button";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function EditPage() {
  //dummy api calls
  const [models, setModels] = useState([]);
  const [position, setPosition] = useState([0, 0, 0]);
  const [id, setId] = useState(1);

  // use useParams() to get roomId

  // create useEffect to get models for this particular room
    // call GET items api-service and set state
    // trigger by the models state

  // change this to async and call POST item api with fetch
  const addModel = (type) => {
    let pos = position;
    if (type === "table") {
      pos[1] = 0.6;
    }
    const newModel = { model: type, position: pos, id: id };
    setModels([...models, newModel]);
    setPosition([position[0] + 3, position[1], position[2]]);
    setId(id + 1);
  };

  // change this to async and call DELETE item api with fetch
  const deleteModel = () => {
    console.log(models.length);
    const newModels = models.filter((model) => model.id !== models.length);
    setModels(newModels);
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

