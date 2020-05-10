import React, { useEffect } from 'react';

const Summary = ({ onEnter }) => {
  // Update stage nav to summary
  useEffect(() => {
    onEnter(3);
  }, [onEnter]);

  return (
    <div>
      <h1>Order Summary</h1>
    </div>
  );
};

export default Summary;
