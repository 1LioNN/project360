import React from "react";
import Button from "./Button";

function ModelButton({ type, addModel }) {
  // console.log(type);
  // console.log(`../assets/models/` + type + "/" + type + ".png");
  return (
    <div className="flex flex-col border-neutral-600 border-2 rounded-3xl h-60 w-52 overflow-hidden">
      <img
        src={require(`../assets/models/${type}/${type}.png`)}
        alt="model"
        className="basis-4/6 object-cover h-[70%]"
      />
      <div className="flex basis-2/6 object-contain p-3 text-white justify-center">
        <Button
          className="bg-indigo-600 rounded-md hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800"
          text="Add To Room"
          onClick={() => addModel(type)}
        />
      </div>
    </div>
  );
}

export default ModelButton;
