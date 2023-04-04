import React from "react";
import NavBar from "../components/NavBar";
import Error from "../components/Error";
import { useAuth0 } from "@auth0/auth0-react";

function NotFound() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="flex flex-col m-0 h-full overflow-hidden">
      <NavBar />
      <Error
        errorCode={404}
        errorDescription={"The page you are trying to access does not exist."}
        errorMessage={"Not Found"}
        redirect={isAuthenticated ? "/dashboard/my-rooms" : "/"}
      />
    </div>
  );
}
export default NotFound;
