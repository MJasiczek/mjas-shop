import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivRouting({ component: Component, ...rest }) {
  const user = useSelector((state) => state.user.profile);
  const {result} = user;
  return (
    <Route
      {...rest}
      render={(props) =>
        result ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}
