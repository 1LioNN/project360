import React from "react";
import Button from "./Button";


function ModelButton({ type, addModel }) {
  return (
    <div className="border-neutral-600 border-2 rounded-3xl h-60 w-52">
      <div className="flex flex-col overflow-hidden">
        <div className="basis-4/6 object-contain">
        </div>
        <div className="flex basis-2/6 object-contain p-3 text-white justify-center">
          <Button className="bg-indigo-600 rounded-md hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800" text="Add To Room" onClick={() => addModel(type)} />
        </div>
      </div>
    </div>
  );
}

export default ModelButton;
