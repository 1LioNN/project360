import React from "react";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import table from "./table.gltf";
import apiService from "../services/api-service.js";

//function takes in a gltf file and returns a primitive object
function Table({ itemId, position, setIsDragging, floorPlane, ContextMenu }) {
  const scale = 0.01;
  const { nodes, materials } = useGLTF(table);
  const [clicked, setClicked] = useState(false);
  const [pos, setPos] = useState(position);

  let planeIntersectPoint = new THREE.Vector3();
  const ref = useRef(null);
  const cm = ContextMenu;

  const clickHandler = (e) => {
    setClicked(!clicked);
    cm.current.style.display = clicked ? " none" : " block";
    cm.current.style.top = e.clientY + "px";
    if (e.clientX > 1625) {
      cm.current.style.left = e.clientX - 250 + "px";
    } else
    cm.current.style.left = e.clientX + "px";
    cm.current.id = itemId;
    cm.current.ref = ref;
  };

  const missHandler = (e) => {
    setClicked(false);
    cm.current.style.display = "none";
    cm.current.id = "";
  };

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (clicked) {
        if (active) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);
          setPos([planeIntersectPoint.x, 0.6, planeIntersectPoint.z]);
        } else {
          setClicked(false);
        }
        setIsDragging(active);
        return timeStamp;
      }
    },
    { delay: true }
  );

  useEffect(() => {
    apiService
      .updateItemPos(itemId, pos)
      .then((res) => setPos(res.item.coordinates));
  }, [clicked]);

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
