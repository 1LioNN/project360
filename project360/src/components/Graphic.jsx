import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Button from "./Button";
import { useAuth0 } from "@auth0/auth0-react";
import apiService from "../services/api-service.js";

function RotatingBox() {
  const ref = React.useRef();
  const refMesh = React.useRef();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    ref.current.rotation.x = a;
    ref.current.rotation.y = a;
    refMesh.current.color.setHSL(0.5 + 0.5 * Math.sin(a * 2), 0.75, 0.5);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[5, 5, 5]} />
      <meshPhongMaterial color="royalblue" ref={refMesh} />
    </mesh>
  );
}

function Graphic() {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div className="flex flex-row basis-full overflow-hidden flex-grow">
      <div className="z-10 fixed top-15 left-0 flex-grow w-screen h-screen bg-black opacity-80 text-white">
        <div className="flex flex-col justify-center items-center h-full gap-16">
          <div className="text-8xl font-bold">Project 360</div>

          <div className="text-xl">Collaborative 3D Room Editor.</div>
          <Button
            className={
              "p-5 w-72  text-3xl bg-indigo-900 hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800"
            }
            text={"Get Started"}
            onClick={() => loginWithRedirect()}
          />
        </div>
      </div>
      <Canvas camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <RotatingBox />
      </Canvas>
    </div>
  );
}

export default Graphic;
