import { OrbitControls } from "@react-three/drei";
import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import Bed from "../models/Bed";
import Table from "../models/Table";
import { useState } from "react";
import img from "../textures/wood.jpg";
import { useRef } from "react";
import { useEffect } from "react";
import ContextMenu from "../components/ContextMenu";

function Room({ dimensions, models, setModels }) {
  const length = dimensions[0];
  const width = dimensions[1];
  const [isDragging, setIsDragging] = useState(false);
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
          rotation={model.rotate}
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
          rotation={model.rotate}
          setIsDragging={setIsDragging}
          floorPlane={floorPlane}
          ContextMenu={cm}
  
        />
      );
    }
    return ``;
  });


  return (
    <div className="basis-9/12 h-screen bg-zinc-900 overflow-hidden">
      <ContextMenu ContextMenu={cm} models={models} setModels={setModels} />
      <Canvas camera={{ position: [0, 5, 10] }}>
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
// Hook
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export default Room;
