import React from "react";
import { useState } from "react";
import ModelButton from "./ModelButton";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1) + "s";
}

function Dropdown({ type, addModel }) {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      <div
        className="m-10 mb-2 font-semibold text-2xl cursor-pointer"
        onClick={toggleShow}
      >
        {capitalizeFirstLetter(type)}
      </div>
      <div
        className="transition-[height] duration-500 overflow-hidden"
        style={{ height: show ? "175px" : "0px" }}
      >
        <div className="flex flex-row overflow-x-scroll">
          <ModelButton type="bed" addModel={addModel} />
          <ModelButton type="bed" addModel={addModel} />
          <ModelButton type="bed" addModel={addModel} />
          <ModelButton type="bed" addModel={addModel} />
          <ModelButton type="bed" addModel={addModel} />
          <ModelButton type="bed" addModel={addModel} />
          <ModelButton type="bed" addModel={addModel} />
        </div>
      </div>
    </div>
  );
}
export default Dropdown;
