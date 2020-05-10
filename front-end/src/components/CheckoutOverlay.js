import React from 'react';
import styled from 'styled-components';
import Overlay from './common/Overlay';
import Spinner from './common/Spinner';
import Title from './common/Title';

const CheckoutOverlay = () => {
  return (
    <StyledCheckoutOverlay>
      <Title className="title" as="h3" variant="h3">
        Processing order...
      </Title>
      <Spinner />
    </StyledCheckoutOverlay>
  );
};

const StyledCheckoutOverlay = styled(Overlay)`
  ${Title} {
    margin-bottom: ${({ theme }) => theme.spacing['6']};
  }
`;

export default CheckoutOverlay;
