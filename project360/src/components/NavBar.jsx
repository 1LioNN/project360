import React from "react";
import logo from "../icons/360.png";
import Button from "./Button";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <div className="flex flex-row bg-gradient-to-t from-neutral-800 to-black h-20 w-full text-gray-50 font-semibold items-center">
      <div className="flex flex-row items-center self-start">
        <img
          src={logo}
          alt="Logo"
          className="h-14 w-12 align-middle ml-5 mt-3"
        />
      </div>

    {!isAuthenticated ? (
      <div className="flex flex-row items-center ml-auto gap-10 mr-7">
        <Button
          className={
            "bg-indigo-900 ease-in-out duration-75 w-28 hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800"
          }
          text={"Log In"}
          onClick={() => loginWithRedirect()}
        />
      </div> 
    ) : (
      <div className="flex flex-row items-center ml-auto mr-7">
        <Button
          className={
            "bg-indigo-900 ease-in-out duration-75 w-28 hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800"
          }
          text={"Log Out"}
          onClick={() => logout()}
        />
      </div>
    )}
    </div>
  );
}

export default NavBar;
