import React from "react";
import { useGLTF } from "@react-three/drei";
import chair from "./chair1.gltf";

export function Chair1({
  innerRef,
  scale,
  pos,
  rot,
  bind,
  clickHandler,
  missHandler,
}) {
  const { nodes, materials } = useGLTF(chair);
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
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0_1.geometry}
        material={nodes.mesh_0_1.material}
      />
    </group>
  );
}

useGLTF.preload(chair);

export default Chair1;
