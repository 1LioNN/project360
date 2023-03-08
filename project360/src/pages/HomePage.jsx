import React from "react";
import Graphic from "../components/Graphic";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import apiService from "../services/api-service.js";

function HomePage() {
  console.log(window.location.origin)
  const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (user && isAuthenticated) {
      apiService.signIn(user.sub, isAuthenticated);
    }
  }, [user, isAuthenticated]);

  return (
    <div className="flex flex-col m-0 h-full">
      <NavBar />
      <Graphic />
    </div>
  );
}

export default HomePage;
