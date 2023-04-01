import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export const AuthGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <p>Loading...</p>,
  });

  return <Component />;
};
