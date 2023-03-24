
import React from "react";
import { useGLTF } from "@react-three/drei";
import bed from "./bed0.gltf";

export function Bed0({ ref, scale, pos, bind, clickHandler, missHandler }) {
  const { nodes, materials } = useGLTF(bed);
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
        geometry={nodes.bed_frame.geometry}
        material={materials.WoodQuarteredChiffon001_2K}
        position={[-2.41, 0.31, 0.77]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.matress.geometry}
        material={materials["Material.001"]}
        position={[-2.41, 0.37, 0.77]}
        scale={[1.53, 0.11, 0.96]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pillow.geometry}
        material={materials.FabricUpholsteryMidCenturyPebbles001_2K}
        position={[-3.32, 0.54, 0.77]}
        scale={[0.45, 0.06, 0.58]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blanket.geometry}
        material={materials.FabricUpholsteryMidCenturyPebbles001_2K}
        position={[-2.13, 0.99, 0.77]}
        scale={[1.35, 1, 1.28]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={materials.WoodFlooringMerbauBrickBondNatural001_2K}
        position={[-0.87, 0, 1.72]}
        rotation={[-Math.PI, 0, 0]}
        scale={[-0.02, 0.02, 0.02]}
      />
    </group>
  );
}

useGLTF.preload("/bed0.gltf");

export default Bed0;
