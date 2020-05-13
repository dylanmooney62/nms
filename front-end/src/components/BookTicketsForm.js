import React, { useContext } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BookingContext } from '../contexts/BookingContext';
import { EventContext } from '../contexts/EventContext';
import api from '../api/index';
import OrderSummary from './OrderSummary';
import TicketSelectorList from './common/TicketSelectorList';
import Title from './common/Title';
import Text from './common/Text';
import Button from './common/Button';
import CustomDatePicker from './common/DatePicker';

const BookEventForm = ({ navigate }) => {
  const event = useContext(EventContext);

  const { id, name, shortDescription, closingDate } = event;

  const { booking, updateBooking } = useContext(BookingContext);

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
      toast.error(response.data.error, {
        toastId: 'booking-error',
      });
    }
  };

  const handleChange = ({ name, value }) => {
    updateBooking({ name, value });
  };

  // Sums total quantity of tickets, if 0 returns false
  const ticketsSelected =
    Object.values(booking.tickets).reduce((x, y) => x + y) > 0;

  return (
    <StyledBookEventForm onSubmit={handleSubmit}>
      <div className="main-form">
        <Title variant="h3" as="h1" color="secondary">
          {name}
        </Title>
        <Text>{shortDescription}</Text>
        <CustomDatePicker
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
    </StyledBookEventForm>
  );
};

const StyledBookEventForm = styled.form`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .main-form {
    max-width: 46rem;
    width: 100%;

    @media (max-width: 768px) {
      margin-bottom: ${({ theme }) => theme.spacing['6']};

      max-width: unset;
      width: 100%;
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

export default BookEventForm;
