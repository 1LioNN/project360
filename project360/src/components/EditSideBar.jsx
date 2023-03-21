import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import apiService from "../services/api-service.js";

function EditSideBar({ roomId, position, setPosition, models, setModels }) {

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
              id: res.item.id,
              model: res.item.category,
              position: res.item.coordinates
            }
            setModels([...models, newItem])
          });
      };

    return (
        <div className="basis-3/12 h-screen bg-gradient-to-br from-zinc-700 via-zinc-400 to-blue-100 ">
            <Button text={"Add"} onClick={() => addModel("bed")} />
            <Button text={"Add Table"} onClick={() => addModel("table")} />
            <Link to="/dashboard"> Back </Link>
        </div>
    );
}

export default EditSideBar;