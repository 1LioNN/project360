import React from "react";
import { useGLTF } from "@react-three/drei";
import table from "./table1.gltf";

export function Table1({ ref, scale, pos, bind, clickHandler, missHandler }) {
  const { nodes, materials } = useGLTF(table);
  return (
    <group
      ref={ref}
      object={nodes}
      scale={scale}
      position={pos}
      {...bind()}
      onClick={(e) => clickHandler(e)}
      onPointerMissed={(e) => missHandler(e)}
      dispose={null}
    >
       <mesh
        castShadow
        receiveShadow
        geometry={nodes.Desk_Plane021.geometry}
        material={nodes.Desk_Plane021.material}
      />
    </group>
  );
}

useGLTF.preload("/table1.gltf");

export default Table1;
