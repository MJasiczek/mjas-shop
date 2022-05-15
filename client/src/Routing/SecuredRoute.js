import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function SecuredRoute({ component: Component, ...rest }) {
  const user= useSelector((state) => state.user.profile);
  const { result } = user;
  return (
    <Route
      {...rest}
      render={(props) =>
        result &&result.Admin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}
