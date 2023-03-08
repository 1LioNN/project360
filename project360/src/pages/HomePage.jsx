import React from "react";
import Graphic from "../components/Graphic";
import NavBar from "../components/NavBar";

function HomePage() {
  console.log(window.location.origin)
  return (
    <div className="flex flex-col m-0 h-full">
      <NavBar />
      <Graphic />
    </div>
  );
}

export default HomePage;
