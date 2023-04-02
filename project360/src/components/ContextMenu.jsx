import React from "react";
import * as THREE from "three";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faRotateRight,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import apiService from "../services/api-service.js";
import audioService from "../services/audio-service.js";
import { useParams } from "react-router-dom";

function ContextMenu({ ContextMenu, models, setModels }) {
  const roomId = useParams().roomId;

  const resetMenu = () => {
    ContextMenu.current.ref = null;
    ContextMenu.current.id = "";
    ContextMenu.current.style.display = "none";
    ContextMenu.current.setBBox(null);
    ContextMenu.current.setCenter(null);
  };

  const deleteItem = () => {
    console.log("delete");
    console.log(ContextMenu.current.id);

    apiService.deleteItem(roomId, ContextMenu.current.id).then((res) => {
      const newModels = models.filter(
        (model) => model.id !== parseInt(ContextMenu.current.id)
      );
      setModels(newModels);
      audioService.context.resume();
      audioService.playDeleteSound(0.2);
      resetMenu();
    }).catch((e) => {
      resetMenu();
    });
  };

  const rotateC = () => {
    console.log("rotateC");
    console.log(ContextMenu.current.id);

    //if rotation is null, close context menu
    try {
      const model = ContextMenu.current.ref.current;
      if (model.rotation.y === null) {
        ContextMenu.current.style.display = "none";
        return;
      }
      model.rotation.y -= Math.PI / 4;
      if (model.rotation.y <= -2 * Math.PI) {
        model.rotation.y = 0;
      }
      const bbox = new THREE.Box3().setFromObject(model);
      ContextMenu.current.setBBox(bbox);
      ContextMenu.current.setCenter(
        bbox.max
          .clone()
          .sub(bbox.min)
          .multiplyScalar(1 / 2)
      );
      apiService
      .updateItemAng(ContextMenu.current.id, model.rotation.y)
      .then((res) => {
        audioService.context.resume();
        audioService.playRotateSound(0.2);
      });
    } catch (e) {
      resetMenu();
    }

  };

  const rotateCC = () => {
    console.log("rotateCC");
    console.log(ContextMenu.current.id);

    try {
    const model = ContextMenu.current.ref.current;
    model.rotation.y += Math.PI / 4;
    if (model.rotation.y >= 2 * Math.PI) {
      model.rotation.y = 0;
    }
    const bbox = new THREE.Box3().setFromObject(model);
    ContextMenu.current.setBBox(bbox);
    ContextMenu.current.setCenter(
      bbox.max
        .clone()
        .sub(bbox.min)
        .multiplyScalar(1 / 2)
    );
    apiService
      .updateItemAng(ContextMenu.current.id, model.rotation.y)
      .then((res) => {
        audioService.context.resume();
        audioService.playRotateSound(0.2);
      });
    } catch (e) {
      resetMenu();
    }

  };

  return (
    <div
      className="flex absolute font-bold text-3xl z-50 h-14 w-48 bg-white rounded-xl border-2 border-white align-middle"
      style={{ display: "none" }}
      ref={ContextMenu}
    >
      <div className="flex flex-row justify-evenly items-center">
        <button
          className="rounded-2xl hover:bg-neutral-200 p-2"
          onClick={rotateCC}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
        <button
          className="rounded-2xl hover:bg-neutral-200 p-2"
          onClick={rotateC}
        >
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
        <button
          className="rounded-2xl hover:bg-neutral-200 p-2"
          onClick={deleteItem}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
export default ContextMenu;
