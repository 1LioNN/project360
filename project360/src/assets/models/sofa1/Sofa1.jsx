import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import sofa from "./sofa1.gltf";

export function Sofa1({ ref, scale, pos, bind, clickHandler, missHandler }) {
  const { nodes, materials } = useGLTF(sofa);
  return (
    <group
      ref={ref}
      object={nodes}
      scale={scale}
      position={pos}
      {...bind()}
      onClick={clickHandler}
      onPointerMissed={missHandler}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface9.geometry}
        material={nodes.polySurface9.material}
      />
    </group>
  );
}

useGLTF.preload("/sofa1.gltf");

export default Sofa1;
