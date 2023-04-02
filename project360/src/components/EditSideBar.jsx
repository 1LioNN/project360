import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import apiService from "../services/api-service.js";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./Dropdown";
import { useAuth0 } from "@auth0/auth0-react";

function EditSideBar({
  roomId,
  position,
  setPosition,
  models,
  setModels,
  name,
}) {
  const { getAccessTokenSilently } = useAuth0();
  const addModel = async (type) => {
    let pos = position;
    switch (type) {
      case "table0":
        pos[1] = 0.9;
        break;
      case "bed1":
        pos[1] = 0.1;
        break;
      case "table1":
        pos[1] = 1;
        break;
      case "sofa1":
        pos[1] = 0.1;
        break;
      default:
        break;
    }
    setPosition([position[0], position[1], position[2]]);
    getAccessTokenSilently()
      .then((accessToken) =>
        apiService.createItem(accessToken, roomId, type, pos)
      )
      .then((res) => {
        const newItem = {
          ...res.item,
          model: res.item.category,
          position: res.item.coordinates,
        };
        setModels([...models, newItem]);
      });
  };

  return (
    <div className="basis-3/12 h-screen bg-gradient-to-t from-black via-neutral-900 to-black text-white overflow-y-auto no-scrollbar">
      <div className=" flex font-semibold text-xl gap-4 items-center m-7 ">
        {name}
      </div>
      <Link
        to="/dashboard"
        className=" flex font-semibold text-2xl gap-4 items-center m-7 hover:text-blue-500"
      >
        <FontAwesomeIcon icon={faLeftLong} style={{ fontSize: 30 }} />
        Back to Dashboard
      </Link>
      <Dropdown type="bed" addModel={addModel} numModels={2} />
      <Dropdown type="table" addModel={addModel} numModels={2} />
      <Dropdown type="chair" addModel={addModel} numModels={2} />
      <Dropdown type="sofa" addModel={addModel} numModels={2} />
    </div>
  );
}

export default EditSideBar;
