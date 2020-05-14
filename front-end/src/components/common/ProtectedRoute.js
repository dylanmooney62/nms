import React from 'react';
import { Redirect } from '@reach/router';
import useAuth from '../../hooks/useAuth';
import Spinner from './Spinner';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isLoading, user] = useAuth();

  if (isLoading) {
    return (
      <Spinner
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  if (!user) {
    return <Redirect from="" to="../" noThrow />;
  }

  return <Component {...rest} user={user} />;
};

export default ProtectedRoute;
