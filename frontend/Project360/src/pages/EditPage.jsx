import { Canvas } from "@react-three/fiber";
import React from "react";
import Room from "../components/Room";
import "./EditPage.css";

function EditPage() {
  return (
    <div className = "flex flex-row flex-wrap m-0 h-full">
      <Room />
    </div>
  );
}
export default EditPage;
