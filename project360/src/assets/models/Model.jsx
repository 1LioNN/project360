import React from "react";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";
import { useState, useEffect } from "react";
import { useRef } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import Sofa0 from "./sofa0/Sofa0";
import Bed0 from "./bed0/Bed0";
import Table0 from "./table0/Table0";
import Chair0 from "./chair0/Chair0";
import Bed1 from "./bed1/Bed1";
import Sofa1 from "./sofa1/Sofa1";
import Table1 from "./table1/Table1";
import Chair1 from "./chair1/Chair1";
import { useParams } from "react-router-dom";

import apiService from "../../services/api-service.js";
import audioService from "../../services/audio-service";
//function takes in a gltf file and returns a primitive object
function Model({
  type,
  itemId,
  position,
  rotation,
  setIsDragging,
  floorPlane,
  dimensions,
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
    case "bed1":
      scale = 0.07;
      floor = 0.1;
      break;
    case "table1":
      scale = 2.5;
      floor = 1;
      break;
    case "sofa1":
      scale = 0.06;
      floor = 0.1;
      break;
    case "chair1":
      scale = 2;
      floor = 0.1;
      break;
    default:
      break;
  }
  const { getAccessTokenSilently } = useAuth0();
  const [clicked, setClicked] = useState(false);
  const [pos, setPos] = useState(position);
  const [bbox, setBBox] = useState(null);
  const [center, setCenter] = useState(null);
  const roomId = useParams().roomId;

  useEffect(() => {
    setPos(position);
  }, [position]);

  let planeIntersectPoint = new THREE.Vector3();
  const ref = useRef();

  const cm = ContextMenu;

  const validX = (x) => {
    if (!center) {
      setCenter(
        bbox.max
          .clone()
          .sub(bbox.min)
          .multiplyScalar(1 / 2)
      );
      return 0;
    }

    const maxAbsX = Math.abs(x) + center.x;
    const signedBound = Math.sign(x) * (dimensions[0] / 2 - center.x);
    return maxAbsX <= dimensions[0] / 2 ? x : signedBound;
  };

  const validZ = (z) => {
    if (!center) {
      setCenter(
        bbox.max
          .clone()
          .sub(bbox.min)
          .multiplyScalar(1 / 2)
      );
      return 0;
    }

    const maxAbsZ = Math.abs(z) + center.z;
    const signedBound = Math.sign(z) * (dimensions[1] / 2 - center.z);
    return maxAbsZ <= dimensions[1] / 2 ? z : signedBound;
  };

  const clickHandler = (e) => {
    if (!clicked) {
      audioService.context.resume();
      audioService.playSelectSound(0.08);
    }
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
    cm.current.ref = ref;
    cm.current.setBBox = setBBox;
    cm.current.setCenter = setCenter;
    setBBox(new THREE.Box3().setFromObject(ref.current));
  };

  const missHandler = () => {
    setClicked(false);
    cm.current.style.display = "none";
    cm.current.id = "";
    setBBox(null);
  };

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (clicked) {
        if (active) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);
          const newX = validX(planeIntersectPoint.x);
          const newZ = validZ(planeIntersectPoint.z);
          setPos([newX, floor, newZ]);
        } else {
          audioService.context.resume();
          audioService.playMoveSound(0.08);
          setClicked(false);
        }
        setIsDragging(active);
        return timeStamp;
      }
    },
    { delay: true }
  );

  useEffect(() => {
    const updateItemPos = async () => {
      const accessToken = await getAccessTokenSilently();
      apiService
        .getMe(accessToken)
        .then((res) =>
          apiService.updateItemPos(accessToken, res.userId, roomId, itemId, pos)
        );
    };

    updateItemPos();
  }, [clicked]);

  switch (type) {
    case "bed0":
      return (
        <Bed0
          innerRef={ref}
          scale={scale}
          pos={pos}
          rot={rotation}
          bind={bind}
          clickHandler={clickHandler}
          missHandler={missHandler}
        />
      );

    case "bed1":
      return (
        <Bed1
          innerRef={ref}
          scale={scale}
          pos={pos}
          rot={rotation}
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
          rot={rotation}
          bind={bind}
          clickHandler={clickHandler}
          missHandler={missHandler}
        />
      );

    case "table1":
      return (
        <Table1
          innerRef={ref}
          scale={scale}
          pos={pos}
          rot={rotation}
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
          rot={rotation}
          bind={bind}
          clickHandler={clickHandler}
          missHandler={missHandler}
        />
      );

    case "sofa1":
      return (
        <Sofa1
          innerRef={ref}
          scale={scale}
          pos={pos}
          rot={rotation}
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
          rot={rotation}
          bind={bind}
          clickHandler={clickHandler}
          missHandler={missHandler}
        />
      );

    case "chair1":
      return (
        <Chair1
          innerRef={ref}
          scale={scale}
          pos={pos}
          rot={rotation}
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
