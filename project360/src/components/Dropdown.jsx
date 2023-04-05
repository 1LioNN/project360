import React from "react";
import { useState } from "react";
import ModelButton from "./ModelButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1) + "s";
}

function Dropdown({ type, addModel, numModels, loadingModels }) {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  let modelButtons = [];
  for (let i = 0; i < numModels; i++) {
    modelButtons.push(
      <ModelButton
        type={type + i}
        addModel={addModel}
        key={i}
        loadingModels={loadingModels}
      />
    );
  }

  return (
    <div>
      <div
        className="flex m-10 mb-2 font-semibold text-xl cursor-pointer justify-between border-b-[1px] border-solid border-neutral-800 hover:text-blue-500"
        onClick={toggleShow}
      >
        {capitalizeFirstLetter(type)}
        <FontAwesomeIcon
          icon={faCaretDown}
          style={{ transform: show ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>

      <div
        className="transition-[max-height] duration-300 ease-in-out overflow-hidden m-5"
        style={{ maxHeight: show ? "5000px" : "0px" }}
      >
        <div className="flex flex-row flex-wrap gap-3 ">{modelButtons}</div>
      </div>
    </div>
  );
}
export default Dropdown;
