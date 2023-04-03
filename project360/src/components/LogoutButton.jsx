import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import apiService from "../services/api-service";
import Button from "./Button";

const LogoutButton = ({ styles, text }) => {
  const { getAccessTokenSilently, logout } = useAuth0();

  const handleLogout = async () => {
    getAccessTokenSilently((accessToken) => {
      apiService.signOut(accessToken);
    });
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return <Button className={styles} text={text} onClick={handleLogout} />;
};

export default LogoutButton;
