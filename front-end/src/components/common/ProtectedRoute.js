import React from 'react';
import { Redirect } from '@reach/router';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isLoading, user] = useAuth();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!user) {
    return <Redirect from="" to="../book" noThrow />;
  }

  return <Component {...rest} user={user} />;
};

export default ProtectedRoute;
