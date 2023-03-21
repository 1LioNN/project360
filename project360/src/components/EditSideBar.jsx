import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import apiService from "../services/api-service.js";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./Dropdown";

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
        <div className="basis-3/12 h-screen bg-gradient-to-t from-black via-neutral-900 to-black text-white">
            <Link to="/dashboard"  className=" flex font-semibold text-2xl gap-4 items-center m-5 hover:text-blue-500"> 
            <FontAwesomeIcon icon={faLeftLong} style={{ fontSize: 40}} />
             Back to Dashboard 
             </Link>
             <Dropdown addModel={addModel} />
        </div>
    );
}

export default EditSideBar;