import React from "react";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";
import { useState } from "react";
import { useRef } from "react";
import Bed from "../models/Bed";
import Table from "../models/Table";

//function takes in a gltf file and returns a primitive object
function Model({ type, position, setIsDragging, floorPlane }) {
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
          setPos([planeIntersectPoint.x, 0, planeIntersectPoint.z]);
        } else {
          console.log("not active");
          setClicked(false);
          ref.current.scale.set(scale, scale, scale);
        }
        setIsDragging(active);
        return timeStamp;
      }
    },
    { delay: true }
  );
  switch (type) {
    case "bed":
      return (
        <Bed
          position={pos}
          {...bind()}
          setisDragging={setIsDragging}
          onClick={() => clickHandler()}
        />
      );
    case "table":
      return (
        <Table
          position={pos}
          {...bind()}
          setisDragging={setIsDragging}
          onClick={() => clickHandler()}
        />
      );
  }
}

export default Model;
