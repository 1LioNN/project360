import React from "react";
import bed from "../models/bed.gltf";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Button from "./Button";

function ModelButton({ type, addModel }) {
  const gltf = useLoader(GLTFLoader, bed);
  return (
    <div className="border-white border-2 h-40 w-36">
      <div className="flex flex-col overflow-hidden ">
        <div className="basis-2/6 object-contain p-3 text-white">
          <Button text="Add" onClick={() => addModel(type)} />
        </div>
      </div>
    </div>
  );
}

export default ModelButton;
