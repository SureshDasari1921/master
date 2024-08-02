import React from 'react'
import { Router } from 'react-bootstrap-icons';
import { Route } from 'react-router';
const token = localStorage.getItem('token')
 
function ProtectedRoute({ component: Component, ...rest }) {
  

  return (
      <Route
          {...rest}
          render={props =>
              true ? (
                  <Component {...props} />
              ) : (
                  <Redirect to="/" />
              )
          }
      />
  );
}

export default ProtectedRoute
