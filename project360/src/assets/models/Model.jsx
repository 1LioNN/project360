import React from "react";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Sofa0 from "./sofa0/Sofa0";
import Bed0 from "./bed0/Bed0";
import Table0 from "./table0/Table0";
import Chair0 from "./chair0/Chair0";
import apiService from "../../services/api-service.js";
//function takes in a gltf file and returns a primitive object
function Model({
  type,
  itemId,
  position,
  setIsDragging,
  floorPlane,
  ContextMenu,
}) {
  let scale = 1;
  let floor = 0;
  switch (type) {
    case "bed0":
      scale = 1.5;
      floor = 0;
      break;
    case "table0":
      scale = 0.017;
      floor = 0.9;
      break;
    case "sofa0":
      scale = 2.5;
      floor = 0;
      break;
    case "chair0":
      scale = 0.024;
      floor = 0;
      break;
    default:
      break;
  }
  const [clicked, setClicked] = useState(false);
  const [pos, setPos] = useState(position);

  let planeIntersectPoint = new THREE.Vector3();
  const ref = useRef();

  const cm = ContextMenu;

  const clickHandler = (e) => {
    setClicked(!clicked);
    cm.current.style.display = clicked ? " none" : " block";
    if (e.clientY > 880) {
      cm.current.style.top = e.clientY - 100 + "px";
    } else {
      cm.current.style.top = e.clientY + "px";
    }

    if (e.clientX > 1625) {
      cm.current.style.left = e.clientX - 250 + "px";
    } else {
      cm.current.style.left = e.clientX + "px";
    }
    cm.current.id = itemId;
  };

  const missHandler = () => {
    setClicked(false);
    cm.current.style.display = "none";
    cm.current.id = "";
  };

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (clicked) {
        if (active) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);
          setPos([planeIntersectPoint.x, floor, planeIntersectPoint.z]);
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

  switch (type) {
    case "bed0":
      return (
        <Bed0
          innerRef={ref}
          scale={scale}
          pos={pos}
          bind={bind}
          clickHandler={clickHandler}
          missHandler={missHandler}
        />
      );

    case "table0":
      return (
        <Table0
        innerRef={ref}
        scale={scale}
        pos={pos}
        bind={bind}
        clickHandler={clickHandler}
        missHandler={missHandler}
      />
      );
    case "sofa0":
      return (
        <Sofa0
          innerRef={ref}
          scale={scale}
          pos={pos}
          bind={bind}
          clickHandler={clickHandler}
          missHandler={missHandler}
        />
      );
    case "chair0":
      return (
        <Chair0
        innerRef={ref}
        scale={scale}
        pos={pos}
        bind={bind}
        clickHandler={clickHandler}
        missHandler={missHandler}
      />
      );


    default:
      return null;
  }
}

export default Model;
