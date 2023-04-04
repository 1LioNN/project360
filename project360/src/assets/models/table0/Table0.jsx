import React from "react";
import { useGLTF } from "@react-three/drei";
import table from "./table0.gltf";

export function Table0({
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
        geometry={nodes.Stütze.geometry}
        material={nodes.Stütze.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stütze_1.geometry}
        material={nodes.Stütze_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_2.geometry}
        material={nodes.mesh_2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_2_1.geometry}
        material={nodes.mesh_2_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_3.geometry}
        material={nodes.mesh_3.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_3_1.geometry}
        material={nodes.mesh_3_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bein.geometry}
        material={nodes.Bein.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bein_1.geometry}
        material={nodes.Bein_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bein_2.geometry}
        material={nodes.Bein_2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bein_3.geometry}
        material={nodes.Bein_3.material}
      />
    </group>
  );
}

useGLTF.preload(table);

export default Table0;
