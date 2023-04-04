import { OrbitControls } from "@react-three/drei";
import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useState } from "react";
import img from "../assets/textures/wood.jpg";
import { useRef } from "react";
import ContextMenu from "../components/ContextMenu";
import Model from "../assets/models/Model";

function Room({ dimensions, models, setModels, pos, setPos }) {
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
    return (
      <Model
        type={model.model}
        key={model.id}
        itemId={model.id}
        position={model.position}
        rotation={model.rotate}
        setIsDragging={setIsDragging}
        floorPlane={floorPlane}
        dimensions={dimensions}
        ContextMenu={cm}
        pos={pos}
        setPos={setPos}
      />
    );
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

export default Room;
