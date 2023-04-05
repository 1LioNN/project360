import React from "react";
import logo from "../assets/icons/360.webp";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const clickHandler = () => {
    isAuthenticated ? navigate("/dashboard/my-rooms") : navigate("/");
  };

  return (
    <div className="flex flex-row bg-gradient-to-t from-neutral-800 to-black h-20 w-full text-gray-50 font-semibold items-center border-neutral-700 border-b-2 pb-1">
      <div
        className="flex flex-row items-center self-start cursor-pointer"
        onClick={() => clickHandler()}
      >
        <img
          src={logo}
          alt="Logo"
          className="h-14 w-14 align-middle ml-5 mt-2"
        />
      </div>

      {!isAuthenticated ? (
        <div className="flex flex-row items-center ml-auto gap-10 mr-7">
          <LoginButton
            styles={
              "bg-indigo-900 w-28 hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800"
            }
            text={"Log In"}
          />
        </div>
      ) : (
        <div className="flex flex-row items-center ml-auto mr-7 gap-8">
          <div className="text-lg mr-auto"> Welcome, {user.nickname}</div>
          <LogoutButton
            styles={
              "bg-indigo-900 w-28 hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800"
            }
            text={"Log Out"}
          />
        </div>
      )}
    </div>
  );
}

export default NavBar;
