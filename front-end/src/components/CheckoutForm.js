import React, { useState } from 'react';
import styled from 'styled-components';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import OrderSummary from './OrderSummary';
import Button from './common/Button';
import CheckoutOverlay from './CheckoutOverlay';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Open Sans", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CheckoutForm = ({ clientSecret, order, user, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.name,
          email: user.email,
          address: {
            city: null,
            country: null,
            line1: null,
            line2: null,
            postal_code: null,
            state: null,
          },
        },
        metadata: {
          orderId: order,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        setLoading(false);
        // Navigate to order summary
        navigate('../summary', {
          state: {
            summary: {
              email: 'dylanmooney62@gmail.com',
              orderNumber: order,
              date: '04/04/2020',
            },
          },
        });
      }

      console.log(result.paymentIntent);
    }
  };

  return (
    <>
      {loading && <CheckoutOverlay />}
      <StyledCheckoutForm onSubmit={handleSubmit}>
        <div className="details">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <OrderSummary buttonText="Confirm Payment">
          <Button type="submit" disabled={!stripe}>
            Confirm
          </Button>
        </OrderSummary>
      </StyledCheckoutForm>
    </>
  );
};

const StyledCheckoutForm = styled.form`
  display: flex;
  justify-content: space-between;

  .details {
    width: 100%;
    max-width: 46rem;
  }
`;

export default CheckoutForm;
