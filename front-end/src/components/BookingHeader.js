import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components';
import StageNav from './StageNav';
import Container from './common/Container';
import { primaryGradient } from '../styles/mixins';
import Logo from './common/Logo';

const BookingHeader = ({ stage }) => {
  return (
    <StyledBookingHeader>
      <Container className="header-top" variant="large">
        <Link to="/">
          <Logo />
        </Link>
      </Container>
      <StageNav stage={stage} />
    </StyledBookingHeader>
  );
};

BookingHeader.propTypes = {
  stage: PropTypes.number.isRequired,
};

const StyledBookingHeader = styled.header`
  background: ${primaryGradient};

  .header-top {
    padding-top: ${({ theme }) => theme.spacing['5']};
    padding-bottom: ${({ theme }) => theme.spacing['5']};
  }
`;

export default BookingHeader;
