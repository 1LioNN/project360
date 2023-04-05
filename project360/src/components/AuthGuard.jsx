import React from "react";
import Loading from "./Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const AuthGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <Loading />,
  });

  return <Component />;
};

export default AuthGuard;
