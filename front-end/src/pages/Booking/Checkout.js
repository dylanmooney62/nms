import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Redirect } from '@reach/router';
import CheckoutForm from '../../components/CheckoutForm';
import CustomLink from '../../components/common/CustomLink';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as StripeLogo } from '../../assets/svg/stripe.svg';

const stripePromise = loadStripe('pk_test_qr6aC4SU2UDKUM40hgvRy24d008GAvBiEK');

const Checkout = ({ onEnter, location, user, navigate }) => {
  useEffect(() => {
    onEnter(2);
  }, [onEnter]);

  // Check there is a client secret and booking for the order
  if (!location?.state?.clientSecret || !location?.state?.order) {
    return <Redirect from="" to="../tickets" noThrow />;
  }

  const { clientSecret, order } = location.state;

  return (
    <StyledCheckout>
      <div className="grow">
        <Elements stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            order={order}
            user={user}
            navigate={navigate}
          />
        </Elements>
        <CustomLink
          to="../tickets"
          icon={faChevronLeft}
          style={{ marginTop: '6.4rem' }}
        >
          Back
        </CustomLink>
      </div>
      <div className="checkout-labels">
        <table
          width="135"
          border="0"
          cellPadding="2"
          cellSpacing="0"
          title="Click to Verify - This site chose DigiCert SSL for secure e-commerce and confidential communications."
        >
          <tr>
            <td width="135" align="center" vAlign="top">
              <script
                type="text/javascript"
                src="https://seal.websecurity.norton.com/getseal?host_name=dm-national-museum-of-scotland.herokuapp.com/&amp;size=L&amp;use_flash=NO&amp;use_transparent=Yes&amp;lang=en"
              ></script>
            </td>
          </tr>
        </table>
        <StripeLogo className="stripe" />
      </div>
    </StyledCheckout>
  );
};

const StyledCheckout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;

  .grow {
    flex: 1;
  }

  .checkout-labels {
    display: flex;
    justify-content: flex-end;
  }

  .stripe {
    margin-left: ${({ theme }) => theme.spacing['5']};
  }
`;

export default Checkout;
