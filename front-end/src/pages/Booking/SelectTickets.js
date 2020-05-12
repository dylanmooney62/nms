import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { BookingContext } from '../../contexts/BookingContext';
import { EventContext } from '../../contexts/EventContext';
import api from '../../api/index';
import Title from '../../components/common/Title';
import Text from '../../components/common/Text';
import DatePicker from '../../components/common/DatePicker';
import TicketSelectorList from '../../components/common/TicketSelectorList';
import OrderSummary from '../../components/OrderSummary';
import Button from '../../components/common/Button';
import CustomLink from '../../components/common/CustomLink';

const SelectTickets = ({ id, navigate, onEnter }) => {
  const { booking, updateBooking } = useContext(BookingContext);

  const event = useContext(EventContext);

  const { name, shortDescription, closingDate } = event;

  // Update stage nav to tickets
  useEffect(() => {
    onEnter(1);
  }, [onEnter]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // attempt to book event
      const { data } = await api.post(`book/${id}`, booking);

      // if successful navigate to checkout stage
      navigate('../checkout', {
        state: {
          clientSecret: data.clientSecret,
          order: data.order,
        },
      });
    } catch ({ response }) {
      // TODO: ADD TOASTY ERROR
      console.log(response);
    }
  };

  const handleChange = ({ name, value }) => {
    updateBooking({ name, value });
  };

  // Sums total quantity of tickets, if 0 returns false
  const ticketsSelected =
    Object.values(booking.tickets).reduce((x, y) => x + y) > 0;

  return (
    <StyledSelectTickets onSubmit={handleSubmit}>
      <div className="select-tickets">
        <Title variant="h3" as="h1" color="secondary">
          {name}
        </Title>
        <Text>{shortDescription}</Text>
        <DatePicker
          className="date-picker"
          label="Visiting Date"
          onChange={handleChange}
          name="date"
          minDate={Date.now()}
          maxDate={new Date(closingDate)}
          selected={new Date(booking.date)}
        />
        <TicketSelectorList />
      </div>
      <OrderSummary>
        <Button type="submit" disabled={!ticketsSelected}>
          Continue
        </Button>
      </OrderSummary>
      <div style={{ width: '100%' }}>
        <CustomLink
          to="../"
          icon={faChevronLeft}
          style={{ marginTop: '6.4rem' }}
        >
          Back
        </CustomLink>
      </div>
    </StyledSelectTickets>
  );
};

const StyledSelectTickets = styled.form`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .select-tickets {
    max-width: 46rem;

    @media (max-width: 768px) {
      margin-bottom: ${({ theme }) => theme.spacing['6']};

      max-width: unset;
      width: 80%;
    }

    @media (max-width: 425px) {
      margin-bottom: ${({ theme }) => theme.spacing['6']};

      max-width: unset;
      width: 100%;
    }
  }

  ${Title} {
    margin-bottom: ${({ theme }) => theme.spacing['4']};
  }

  ${Text} {
    margin-bottom: ${({ theme }) => theme.spacing['6']};
  }

  .date-picker {
    margin-bottom: ${({ theme }) => theme.spacing['8']};

    @media (max-width: 768px) {
      margin-bottom: ${({ theme }) => theme.spacing['6']};
    }
  }
`;

export default SelectTickets;
