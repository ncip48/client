import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

function AuthRoute({ component: Component, ...rest }) {
  const { authTokens, authUsername } = useAuth();
  //console.log(authTokens)
  return (
    <Route
      {...rest}
      render={props =>
        authTokens? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default AuthRoute;