import React, { useState } from 'react';
import styled from 'styled-components';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { format, fromUnixTime } from 'date-fns';
import OrderSummary from './OrderSummary';
import Button from './common/Button';
import CheckoutOverlay from './CheckoutOverlay';
import Title from './common/Title';
import Text from './common/Text';

const CheckoutForm = ({ clientSecret, order, user, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleCardChange = ({ complete }) => {
    if (complete) {
      setDisabled(false);
    } else if (!disabled) {
      setDisabled(true);
    }
  };

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

      setLoading(false);
    } else {
      console.log(result.paymentIntent.status);

      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        setLoading(false);
        // Navigate to order summary

        const { receipt_email, amount, created } = result.paymentIntent;

        const date = format(fromUnixTime(created), 'yyyy-MM-dd');

        navigate('../summary', {
          state: {
            summary: {
              date,
              email: receipt_email,
              orderNumber: order,
              total: amount,
            },
          },
        });
      }
    }
  };

  return (
    <>
      {loading && <CheckoutOverlay />}
      <StyledCheckoutForm onSubmit={handleSubmit}>
        <div className="details">
          <Title className="details-title" as="h1" variant="h3">
            Payment Details
          </Title>
          <CardElement className="card-element" onChange={handleCardChange} />
          <Text>NO AUTH TEST CARD: 4242 4242 4242 4242</Text>
          <Text>AUTHENTICATION TEST CARD: 4000 0025 0000 3155</Text>
          <Text>INSUFFICIENT FUNDS TEST CARD: 4000 0000 0000 9995</Text>
        </div>
        <OrderSummary buttonText="Confirm Payment">
          <Button type="submit" disabled={!stripe || disabled}>
            Confirm payment
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

  .details-title {
    margin-bottom: ${({ theme }) => theme.spacing['6']};
  }

  .card-element {
    border: 0.1rem solid red;
    min-height: 4.1rem;
    padding: ${({ theme }) => theme.spacing['3']};
    border: 0.1rem solid ${({ theme }) => theme.colors['grey-platinum']};
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors['grey-granite']};

    margin-bottom: ${({ theme }) => theme.spacing['4']};
  }

  ${Text} {
    font-weight: 600;
  }
`;

export default CheckoutForm;
