import React from "react";
import { useGLTF } from "@react-three/drei";
import table from "./table1.gltf";

export function Table1({
  innerRef,
  scale,
  pos,
  rot,
  bind,
  clickHandler,
  missHandler,
}) {
  const { nodes, materials } = useGLTF(table);
  return (
    <group
      ref={innerRef}
      object={nodes}
      scale={scale}
      position={pos}
      rotation={[0, rot, 0]}
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
        position={[-0.9, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(table);

export default Table1;
