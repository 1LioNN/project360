import { OrbitControls } from "@react-three/drei";
import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useDrag } from 'react-dnd'

function Room() {
  const gltf = useLoader(GLTFLoader, "/src/models/bed.gltf");

  return (
    <div className="basis-9/12 h-screen bg-black">
      <Canvas camera={{ position: [-10, 7, 0] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enablePan={false} minDistance={5} maxDistance={20} />
        <primitive object={gltf.scene} scale={1} position ={[0,0,0]}/>

        <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[10, 5]} />
          <meshStandardMaterial color={"grey"} />
        </mesh>
        <mesh position={[0, 2.5, 5]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[10, 5]} />
          <meshStandardMaterial color={"grey"} />
        </mesh>

        <mesh position={[0, 2.5, -5]} rotation={[0, 0, 0]}>
          <planeGeometry args={[10, 5]} />
          <meshStandardMaterial color={"grey"} />
        </mesh>
        <mesh position={[5, 2.5, 0]} rotation={[0, (3 * Math.PI) / 2, 0]}>
          <planeGeometry args={[10, 5]} />
          <meshStandardMaterial color={"grey"} />
        </mesh>

        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color={"lightblue"} side={THREE.DoubleSide} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default Room;
