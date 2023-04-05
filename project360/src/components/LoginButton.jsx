import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";

const LoginButton = ({ styles, text }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard/my-rooms",
      },
    });
  };

  return <Button className={styles} text={text} onClick={handleLogin} />;
};

export default LoginButton;
