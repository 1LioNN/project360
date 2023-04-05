import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import sofa from "./sofa1.gltf";

export function Sofa1({
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
        geometry={nodes.polySurface9.geometry}
        material={nodes.polySurface9.material}
      />
    </group>
  );
}

useGLTF.preload(sofa);

export default Sofa1;
