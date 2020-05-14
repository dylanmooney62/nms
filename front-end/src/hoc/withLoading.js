import React from 'react';

const withLoading = (Component) => {
  return ({ isLoading, ...props }) => {
    if (!isLoading) return <Component {...props} />;
    return <div>Loading my babies</div>;
  };
};

export default withLoading;
