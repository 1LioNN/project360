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
import { useAuth0 } from "@auth0/auth0-react";

function ContextMenu({ ContextMenu, models, setModels }) {
  const roomId = useParams().roomId;
  const { getAccessTokenSilently } = useAuth0();

  const resetMenu = () => {
    ContextMenu.current.ref = null;
    ContextMenu.current.id = "";
    ContextMenu.current.style.display = "none";
    ContextMenu.current.setBBox(null);
    ContextMenu.current.setCenter(null);
  };

  const updateRotation = async (id, rotation) => {
    const accessToken = await getAccessTokenSilently();
    apiService.getMe(accessToken).then((res) => {
      apiService.updateItemAng(accessToken, res.userId, roomId, id, rotation);
      audioService.context.resume();
      audioService.playRotateSound(0.35);
    });
  };

  const updateDelete = async (id) => {
    const accessToken = await getAccessTokenSilently();
    apiService
      .getMe(accessToken)
      .then((res) => apiService.deleteItem(accessToken, res.userId, roomId, id))
      .then((res) => {
        const newModels = models.filter(
          (model) => model.id !== parseInt(ContextMenu.current.id)
        );
        audioService.context.resume();
        audioService.playDeleteSound(0.2);
        setModels(newModels);
        resetMenu();
      })
      .catch((e) => {
        resetMenu();
      });
  };

  const deleteItem = () => {
    updateDelete(ContextMenu.current.id);
  };

  const rotateC = () => {
    try {
      const model = ContextMenu.current.ref.current;
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
      updateRotation(ContextMenu.current.id, model.rotation.y);
    } catch (e) {
      resetMenu();
    }
  };

  const rotateCC = () => {
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
      updateRotation(ContextMenu.current.id, model.rotation.y);
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
