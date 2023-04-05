import React from "react";
import { useGLTF } from "@react-three/drei";
import bed from "./bed0.gltf";

export function Bed0({
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
        geometry={nodes.bed_frame.geometry}
        material={materials.WoodQuarteredChiffon001_2K}
        position={[0, 0.31, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.matress.geometry}
        material={materials["Material.001"]}
        position={[0, 0.37, 0]}
        scale={[1.53, 0.11, 0.96]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pillow.geometry}
        material={materials.FabricUpholsteryMidCenturyPebbles001_2K}
        position={[-0.91, 0.54, 0]}
        scale={[0.45, 0.06, 0.58]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blanket.geometry}
        material={materials.FabricUpholsteryMidCenturyPebbles001_2K}
        position={[0.28, 0.99, 0]}
        scale={[1.35, 1, 1.28]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={materials.WoodFlooringMerbauBrickBondNatural001_2K}
        position={[1.54, 0, 0.95]}
        rotation={[-Math.PI, 0, 0]}
        scale={[-0.02, 0.02, 0.02]}
      />
    </group>
  );
}

useGLTF.preload(bed);

export default Bed0;
