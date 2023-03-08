import React from "react";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";
import { useState } from "react";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import table from "./table.gltf";
//function takes in a gltf file and returns a primitive object
function Table({ position, setIsDragging, floorPlane }) {
  const scale = 0.01;
  const { nodes, materials } = useGLTF(table);
  const [clicked, setClicked] = useState(false);
  const [pos, setPos] = useState(position);

  let planeIntersectPoint = new THREE.Vector3();
  const ref = useRef();

  const clickHandler = () => {
    setClicked(!clicked);
    ref.current.scale.set(scale * 1.1, scale * 1.1, scale * 1.1);
  };

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (clicked) {
        if (active) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);
          setPos([planeIntersectPoint.x, 0.6, planeIntersectPoint.z]);
        } else {
          setClicked(false);
          ref.current.scale.set(scale, scale, scale);
        }
        setIsDragging(active);
        return timeStamp;
      }
    },
    { delay: true }
  );
  return (
    <group
      ref={ref}
      object={nodes}
      scale={scale}
      position={pos}
      {...bind()}
      onClick={() => clickHandler()}
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

useGLTF.preload("src/models/table.gltf");

export default Table;
