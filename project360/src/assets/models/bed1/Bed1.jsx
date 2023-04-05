import React from "react";
import { useGLTF } from "@react-three/drei";
import bed from "./bed1.gltf";

export function Bed1({
  innerRef,
  scale,
  pos,
  rot,
  bind,
  clickHandler,
  missHandler,
}) {
  const { nodes, materials } = useGLTF(bed);
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
        geometry={nodes.BedBase.geometry}
        material={nodes.BedBase.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BedUnderSheet.geometry}
        material={nodes.BedUnderSheet.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BedFold.geometry}
        material={nodes.BedFold.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BedPillow01.geometry}
        material={nodes.BedPillow01.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BedPillow02.geometry}
        material={nodes.BedPillow02.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BedPillow03.geometry}
        material={nodes.BedPillow03.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BedBack.geometry}
        material={nodes.BedBack.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sheet.geometry}
        material={nodes.Sheet.material}
      />
    </group>
  );
}

useGLTF.preload(bed);

export default Bed1;
