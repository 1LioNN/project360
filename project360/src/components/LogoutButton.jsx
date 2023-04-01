import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";

const LogoutButton = ({ styles, text }) => {
  const { logout } = useAuth0();

  const handleLogin = async () => {
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return <Button className={styles} text={text} onClick={handleLogin} />;
};

export default LogoutButton;
