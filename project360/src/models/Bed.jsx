import React from "react";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import bed from "./bed.gltf";
import apiService from "../services/api-service.js";

//function takes in a gltf file and returns a primitive object
function Bed({ itemId, position, setIsDragging, floorPlane, ContextMenu }) {
  const scale = 1;
  const { nodes, materials } = useGLTF(bed);
  const [clicked, setClicked] = useState(false);
  const [pos, setPos] = useState(position);

  let planeIntersectPoint = new THREE.Vector3();
  const ref = useRef();

  const cm = ContextMenu;

  const clickHandler = (e) => {
    setClicked(!clicked);
    cm.current.style.display = (clicked ? " none" : " block")
    cm.current.style.top = e.clientY + "px";
    cm.current.style.left = e.clientX + "px";
    cm.current.id = itemId;
    ref.current.scale.set(scale * 1.1, scale * 1.1, scale * 1.1);
  };

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (clicked) {
        if (active) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);
          setPos([planeIntersectPoint.x, 0, planeIntersectPoint.z]);
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
        material={materials["Material.001"]}
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

useGLTF.preload("src/models/bed.gltf");

export default Bed;
