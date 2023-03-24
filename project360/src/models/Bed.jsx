import React from "react";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import bed from "./bed.gltf";
import apiService from "../services/api-service.js";

//function takes in a gltf file and returns a primitive object
function Bed({ itemId, position, setIsDragging, floorPlane, ContextMenu}) {
  const scale = 1;
  const { nodes, materials } = useGLTF(bed);
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
          setPos([planeIntersectPoint.x, 0, planeIntersectPoint.z]);
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
        material={materials["Material.001"]}
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

useGLTF.preload("src/models/bed.gltf");

export default Bed;
