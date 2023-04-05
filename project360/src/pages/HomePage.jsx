import React from "react";
import Graphic from "../components/Graphic";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col m-0 h-full">
      <NavBar />
      <Graphic />
      <Link
        className="z-50 text-white ml-auto mr-4 mb-2 text-lg underline"
        to="/credits"
      >
        Credits
      </Link>
    </div>
  );
}

export default HomePage;
