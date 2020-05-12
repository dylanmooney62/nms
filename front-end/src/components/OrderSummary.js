import React, { useContext } from 'react';
import styled from 'styled-components';
import { BookingContext } from '../contexts/BookingContext';
import { EventContext } from '../contexts/EventContext';
import Title from './common/Title';
import Button from './common/Button';

const OrderSummary = ({ children }) => {
  const { booking } = useContext(BookingContext);
  const event = useContext(EventContext);

  const { tickets } = booking;
  const { ticketPrice } = event;

  //   Loop through selected tickets and total all ticket price * quantity
  const total = Object.keys(tickets).reduce((accum, type) => {
    return accum + ticketPrice[type] * tickets[type];
  }, 0);

  return (
    <StyledOrderSummary>
      <div className="order-summary-top">
        <Title variant="h4" as="h2">
          Order Summary
        </Title>
        <ul>
          {Object.entries(tickets).map(([type, quantity]) =>
            quantity ? (
              <li key={type}>
                <span className="ticket">
                  {quantity} x {type} Ticket
                </span>
                <span className="price">£{ticketPrice[type]}</span>
              </li>
            ) : null,
          )}
        </ul>
        <dl className="order-total">
          <dt>Total:</dt>
          <dd>£{total.toFixed(2)}</dd>
        </dl>
      </div>
      {children}
    </StyledOrderSummary>
  );
};

const StyledOrderSummary = styled.div`
  max-width: ${({ theme }) => theme.spacing['12']};
  width: 100%;

  border: 0.1rem solid ${({ theme }) => theme.colors['grey-platinum']};
  border-radius: 0.1rem;
  align-self: flex-start;

  @media (max-width: 768px) {
    align-self: center;
  }

  .order-summary-top {
    min-height: ${({ theme }) => theme.spacing['12']};
    padding: ${({ theme }) => theme.spacing['3']};
    position: relative;
    display: flex;
    flex-direction: column;
    font-family: ${({ theme }) => theme.typography.headings};
    font-weight: 500;
  }

  ul {
    list-style: none;
    font-size: 1.2rem;
    flex: 1;
  }

  ${Title} {
    font-size: 1.6rem;
  }

  .ticket {
    color: ${({ theme }) => theme.colors['purple-orchid']};
    text-transform: capitalize;
  }

  li {
    display: flex;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors['grey-raisin']};
    letter-spacing: 0.1rem;

    &:not(:last-child) {
      margin-bottom: ${({ theme }) => theme.spacing['3']};
    }
  }

  .order-total {
    font-size: 1.4rem;
    display: flex;
    margin-left: auto;

    dt {
      color: ${({ theme }) => theme.colors['purple-orchid']};
      margin-right: ${({ theme }) => theme.spacing['3']};
    }
  }

  ${Button} {
    width: 100%;
  }
`;

export default OrderSummary;
