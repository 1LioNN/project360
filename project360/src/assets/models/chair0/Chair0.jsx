import React from "react";
import { useGLTF } from "@react-three/drei";
import chair from "./chair0.gltf";

export function Chair0({
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
        geometry={nodes.weaving3DAlanaOfficeChairFabricMesh001.geometry}
        material={nodes.weaving3DAlanaOfficeChairFabricMesh001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.weaving3DAlanaOfficeChairFabricSeater001.geometry}
        material={nodes.weaving3DAlanaOfficeChairFabricSeater001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.weaving3DAlanaOfficeChairPlastic001.geometry}
        material={nodes.weaving3DAlanaOfficeChairPlastic001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.weaving3DAlanaOfficeChairMetal001.geometry}
        material={nodes.weaving3DAlanaOfficeChairMetal001.material}
      />
    </group>
  );
}

useGLTF.preload(chair);

export default Chair0;
