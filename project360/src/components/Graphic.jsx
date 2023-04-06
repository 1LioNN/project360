import React from "react";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import LoginButton from "./LoginButton";
import * as THREE from "three";
import img from "../assets/textures/wood.jpg";
import { useLoader } from "@react-three/fiber";
import Bed1 from "../assets/models/bed1/Bed1";
import Table1 from "../assets/models/table1/Table1";
import Chair0 from "../assets/models/chair0/Chair0";
import Sofa0 from "../assets/models/sofa0/Sofa0";

function RoomExample() {
  const ref = useRef();
  const length = 10;
  const width = 10;
  const texture = useLoader(THREE.TextureLoader, img);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime() / 1.5;
    ref.current.rotation.y = a;
  });

  return (
    <group ref={ref} rotation={[0, 0, 0]}>
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
      <Bed1
        pos={[-2.8, 0.1, -2]}
        rot={0}
        bind={() => {
          return;
        }}
        scale={0.07}
      />
      <Table1
        pos={[-2.67, 1, 4]}
        rot={Math.PI}
        bind={() => {
          return;
        }}
        scale={2.5}
      />
      <Chair0
        pos={[-2.75, 0, 2.5]}
        rot={0}
        bind={() => {
          return;
        }}
        scale={0.024}
      />
      <Sofa0
        pos={[3.75, 0, -2.15]}
        rot={-Math.PI / 2}
        bind={() => {
          return;
        }}
        scale={2.5}
      />
    </group>
  );
}

function Graphic() {
  return (
    <div className="flex flex-row basis-full overflow-hidden flex-grow">
      <div className="z-10 fixed top-15 left-0 flex-grow w-screen h-screen bg-black opacity-80 text-white">
        <div className="flex flex-col justify-center items-center h-full gap-16">
          <div className="text-8xl font-bold text-center">Project 360</div>
          <div className="text-xl">Collaborative 3D Room Editor.</div>
          <LoginButton
            styles={
              "p-5 w-72  text-3xl bg-indigo-900 hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800"
            }
            text={"Get Started"}
          />
        </div>
      </div>
      <Canvas camera={{ position: [0, 8, 11] }}>
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RoomExample />
      </Canvas>
    </div>
  );
}

export default Graphic;
