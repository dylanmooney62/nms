import React, { useContext } from 'react';
import styled from 'styled-components';
import { BookingContext } from '../../contexts/BookingContext';
import { EventContext } from '../../contexts/EventContext';
import TicketSelector from './TicketSelector';

const TicketSelectorList = () => {
  const { booking, updateTickets } = useContext(BookingContext);
  const event = useContext(EventContext);

  const { tickets } = booking;
  const { ticketPrice } = event;

  const handleChange = ({ type, quantity }) => {
    updateTickets({ type, quantity });
  };

  return (
    <StyledTicketSelectorList>
      {Object.entries(ticketPrice).map(([type, price]) =>
        price > 0 ? (
          <TicketSelector
            key={type}
            type={type}
            quantity={tickets[type]}
            onChange={handleChange}
            price={price}
          />
        ) : null,
      )}
    </StyledTicketSelectorList>
  );
};

const StyledTicketSelectorList = styled.div``;

export default TicketSelectorList;
