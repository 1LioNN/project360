import React from "react";
import bed from "../models/bed.gltf";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function ModelButton({ type, addModel }) {
    const gltf = useLoader(GLTFLoader, bed);
    return (
        <div>
            <Canvas camera={{ position: [3, 3, 3] }}>
                <ambientLight intensity={0.5}/>
                <primitive object={gltf.scene} />
            </Canvas>
            <button onClick={() => addModel(type)}>{type}</button>
        </div>
    );
}

export default ModelButton;