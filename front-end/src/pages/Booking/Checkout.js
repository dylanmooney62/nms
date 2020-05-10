import React, { useEffect } from 'react';
import styled from 'styled-components';

import CheckoutForm from '../../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Redirect } from '@reach/router';

const stripePromise = loadStripe('pk_test_qr6aC4SU2UDKUM40hgvRy24d008GAvBiEK');

const Checkout = ({ onEnter, location, user, navigate }) => {
  useEffect(() => {
    onEnter(2);
  }, [onEnter]);

  if (!location.state) {
    return <Redirect from="" to="../tickets" noThrow />;
  }

  const { clientSecret, order } = location.state;

  return (
    <StyledCheckout>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          clientSecret={clientSecret}
          order={order}
          user={user}
          navigate={navigate}
        />
      </Elements>
    </StyledCheckout>
  );
};

const StyledCheckout = styled.div``;

export default Checkout;
