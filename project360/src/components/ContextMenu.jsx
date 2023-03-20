import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faRotateRight,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

function ContextMenu({ ContextMenu }) {
  const deleteItem = () => {
    console.log("delete");
    console.log(ContextMenu.current.id);
  };

  const rotateC = () => {
    console.log("rotateC");
    console.log(ContextMenu.current.id);
  };

  const rotateCC = () => {
    console.log("rotateCC");
    console.log(ContextMenu.current.id);
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
