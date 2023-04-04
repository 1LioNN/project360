import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import sofa from "./sofa0.gltf";

export function Sofa0({
  innerRef,
  scale,
  pos,
  rot,
  bind,
  clickHandler,
  missHandler,
}) {
  const { nodes, materials } = useGLTF(sofa);
  return (
    <group
      ref={innerRef}
      object={nodes}
      scale={scale}
      position={pos}
      rotation={[0, rot, 0]}
      {...bind()}
      onClick={clickHandler}
      onPointerMissed={missHandler}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cushion_Seats_002_Cushion_Seats.geometry}
        material={nodes.Cushion_Seats_002_Cushion_Seats.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cushion_Seats_003_Cushion_Seats.geometry}
        material={nodes.Cushion_Seats_003_Cushion_Seats.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cushion_Seats001_Cushion_Seats.geometry}
        material={nodes.Cushion_Seats001_Cushion_Seats.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.William_302_Zanotta_Legs001.geometry}
        material={nodes.William_302_Zanotta_Legs001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.William_302_Zanotta003.geometry}
        material={nodes.William_302_Zanotta003.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.William_302_Zanotta004.geometry}
        material={nodes.William_302_Zanotta004.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.William_302_Zanotta005.geometry}
        material={nodes.William_302_Zanotta005.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.William_Cushion_side.geometry}
        material={nodes.William_Cushion_side.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.William_Cushion_side001.geometry}
        material={nodes.William_Cushion_side001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.William_Cushion003.geometry}
        material={nodes.William_Cushion003.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.William_Cushion004.geometry}
        material={nodes.William_Cushion004.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.William_Cushion005.geometry}
        material={nodes.William_Cushion005.material}
      />
    </group>
  );
}

useGLTF.preload(sofa);

export default Sofa0;
