import React from 'react';
import styled from 'styled-components';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import OrderSummary from './OrderSummary';
import Button from './common/Button';

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

const CheckoutForm = ({ clientSecret, order }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Dylan Mooney',
          email: 'dylanmooney62@gmail.com',
        },
        metadata: {
          orderId: order,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        console.log('success!');
      }
    }
  };

  return (
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
