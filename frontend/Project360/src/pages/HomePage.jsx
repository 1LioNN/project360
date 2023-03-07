import React from "react";
import Graphic from "../components/Graphic";
import NavBar from "../components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import Room from "../components/Room";

function HomePage() {
  const { isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
    <div className="flex flex-col m-0 h-full">
      <NavBar />
      <Graphic />
    </div>
    )
  );
}

export default HomePage;
