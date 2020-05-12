import React, { useState, useEffect, useContext } from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';
import useEvents from '../../hooks/useEvents';
import { EventContext } from '../../contexts/EventContext';
import { BookingContext } from '../../contexts/BookingContext';
import SelectTickets from './SelectTickets';
import api from '../../api';
import Login from './Login';
import Checkout from './Checkout';
import Summary from './Summary';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import BookingHeader from '../../components/BookingHeader';
import Container from '../../components/common/Container';
import CustomToast from '../../components/common/CustomToast';

const Booking = ({ id }) => {
  const [isLoading, event] = useEvents(`/${id}`);
  const [stage, setStage] = useState(-1);
  const { clearBooking } = useContext(BookingContext);

  // Reset booking and log out user if they leave the booking page
  useEffect(() => {
    return () => {
      clearBooking(); // Clear token cookie
      api.get('auth/logout');
    };
  }, [clearBooking]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if tickets cant be purchased for this event return 404
  if (!event || !event.ticketed) {
    return <div>404 | not found</div>;
  }

  const handleEnter = (stage) => {
    setStage(stage);
  };

  return (
    <StyledBooking>
      <CustomToast />
      <BookingHeader stage={stage} />
      <Container className="main" variant="small" as="main">
        <EventContext.Provider value={event}>
          <Router>
            <Login path="/" onEnter={handleEnter} />
            <ProtectedRoute
              path="tickets"
              component={SelectTickets}
              onEnter={handleEnter}
            />
            <ProtectedRoute
              path="checkout"
              component={Checkout}
              onEnter={handleEnter}
            />
            <ProtectedRoute
              path="summary"
              component={Summary}
              onEnter={handleEnter}
            />
          </Router>
        </EventContext.Provider>
      </Container>
    </StyledBooking>
  );
};

export default Booking;

const StyledBooking = styled.div`
  display: flex;
  flex-direction: column;

  .main {
    padding-top: ${({ theme }) => theme.spacing['8']};
    padding-bottom: ${({ theme }) => theme.spacing['8']};
  }
`;
