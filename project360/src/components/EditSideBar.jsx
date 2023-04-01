import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/api-service.js";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./Dropdown";
import Loading from "./Loading";

function EditSideBar({
  roomId,
  position,
  setPosition,
  models,
  setModels,
  name,
  loadingRoom,
  loadingItems,
}) {
  const [loadingModels, setLoadingModels] = useState(false);

  const addModel = async (type) => {
    setLoadingModels(true);
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
    apiService.createItem(roomId, type, pos).then((res) => {
      const newItem = {
        ...res.item,
        model: res.item.category,
        position: res.item.coordinates,
      };
      setModels([...models, newItem]);
      setLoadingModels(false);
    });
  };

  return (
    <div>
    {!loadingRoom && !loadingItems ? (
    <div className="basis-3/12 h-screen bg-gradient-to-t from-black via-neutral-900 to-black text-white overflow-y-auto no-scrollbar">
      <div className=" flex font-semibold text-xl gap-4 items-center m-7 ">
        {name}
      </div>
      <Link
        to="/dashboard/my-rooms"
        className=" flex font-semibold text-2xl gap-4 items-center m-7 hover:text-blue-500"
      >
        <FontAwesomeIcon icon={faLeftLong} style={{ fontSize: 30 }} />
        Back to Dashboard
      </Link>
      <Dropdown type="bed" addModel={addModel} numModels={2} loadingModels={loadingModels}/>
      <Dropdown type="table" addModel={addModel} numModels={2} loadingModels={loadingModels} />
      <Dropdown type="chair" addModel={addModel} numModels={2} loadingModels={loadingModels}/>
      <Dropdown type="sofa" addModel={addModel} numModels={2} loadingModels={loadingModels}/>
    </div> ) : (
      <Loading />)
    }
    </div>
  );
}

export default EditSideBar;
