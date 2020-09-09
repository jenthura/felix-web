import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import TokenService from '../../services/token-services';

function PrivateRoute(props) {
  const { path: currentPath, comp: Component } = props;
  console.log(TokenService.hasAuthToken())

  return (
    <Route
      {...props}
      render={(props) => 
        (TokenService.hasAuthToken())
          ? <Component {...props} />
          : (
              <Redirect
                to={{
                  pathName: '/login',
                  state: { from: currentPath },
                }}
              />
            )
      }
    />
  );
}

export default PrivateRoute;