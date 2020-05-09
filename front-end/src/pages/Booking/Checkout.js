import React, { useEffect } from 'react';
import styled from 'styled-components';

import CheckoutForm from '../../components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_qr6aC4SU2UDKUM40hgvRy24d008GAvBiEK');

const Checkout = ({ onEnter, location }) => {
  useEffect(() => {
    onEnter(2);
  }, [onEnter]);

  const { clientSecret, order } = location.state;

  return (
    <StyledCheckout>
      <Elements stripe={stripePromise}>
        <CheckoutForm clientSecret={clientSecret} order={order} />
      </Elements>
    </StyledCheckout>
  );
};

const StyledCheckout = styled.div``;

export default Checkout;
