import { OrbitControls } from "@react-three/drei";
import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import Bed from "../models/Bed";
import Table from "../models/Table";
import { useState } from "react";
import img from "../textures/wood.jpg";
import { useRef } from "react";
import Button from "./Button";

function Room({ dimensions, models }) {
  const length = dimensions[0];
  const width = dimensions[1];
  const [isDragging, setIsDragging] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const texture = useLoader(THREE.TextureLoader, img);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  const cm = useRef(null);

  const modelsList = models.map((model) => {
    if (model.model === "bed") {
      return (
        <Bed
          key={model.id}
          itemId={model.id}
          position={model.position}
          setIsDragging={setIsDragging}
          floorPlane={floorPlane}
          ContextMenu={cm}

        />
      );
    }
    if (model.model === "table") {
      return (
        <Table
          key={model.id}
          itemId={model.id}
          position={model.position}
          setIsDragging={setIsDragging}
          floorPlane={floorPlane}
          ContextMenu={cm}
        />
      );
    }
    return ``;
  });

  const clickHandler = () => {
    //If the context menu is open and user clicked canvas, close it
    if (showContextMenu) {
      setShowContextMenu(false);
      cm.current.style.display = "none";
    }
    //Else if the context menu is alredy closed and user clicked canvas, do nothing
    else {
      return;
    }
 
  };

  return (
    <div className="basis-9/12 h-screen bg-zinc-900">
      <div className="absolute font-bold text-3xl z-50 h-16 w-60 bg-white rounded-xl border-2 border-white" style={{display: 'none'}} ref={cm}>
        <div className="flex flex-row">
          <Button text="" onClick={()=>console.log("HEllo!")}/>
          <Button text="" onClick={()=>console.log("HEllo!")}/>
          <Button text="" onClick={()=>console.log("HEllo!")}/>
        </div>
      </div>
      <Canvas camera={{ position: [0, 5, 10] }} onClick ={()=> clickHandler()}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh position={[-length / 2, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[width, 5]} />
          <meshStandardMaterial color={"grey"} />
        </mesh>

        <mesh position={[0, 2.5, width / 2]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[length, 5]} />
          <meshStandardMaterial color={"grey"} />
        </mesh>

        <mesh position={[0, 2.5, -width / 2]} rotation={[0, 0, 0]}>
          <planeGeometry args={[length, 5]} />
          <meshStandardMaterial color={"grey"} />
        </mesh>

        <mesh
          position={[length / 2, 2.5, 0]}
          rotation={[0, (3 * Math.PI) / 2, 0]}
        >
          <planeGeometry args={[width, 5]} />
          <meshStandardMaterial color={"grey"} />
        </mesh>

        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[length, width]} />
          <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>

        {modelsList}
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={50}
          enabled={!isDragging}
        />
      </Canvas>
    </div>
  );
}

export default Room;
