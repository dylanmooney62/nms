import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { BookingContext } from '../../contexts/BookingContext';
import { EventContext } from '../../contexts/EventContext';
import api from '../../api/index';
import Title from '../../components/common/Title';
import Text from '../../components/common/Text';
import DatePicker from '../../components/common/DatePicker';
import TicketSelectorList from '../../components/common/TicketSelectorList';
import OrderSummary from '../../components/OrderSummary';
import Button from '../../components/common/Button';

const SelectTickets = ({ id, navigate, onEnter }) => {
  const { booking, updateBooking } = useContext(BookingContext);
  const event = useContext(EventContext);

  const { name, shortDescription, closingDate } = event;

  useEffect(() => {
    onEnter(1);
  }, [onEnter]);

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post(`book/${id}`, booking)
      .then(({ data }) => {
        navigate('../checkout', {
          state: {
            clientSecret: data.clientSecret,
            order: data.order,
          },
        });
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  const handleChange = ({ name }, { value }) => {
    updateBooking({ name, value });
  };

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
          minDate={Date.now()}
          maxDate={new Date(closingDate)}
          onChange={handleChange}
          name="date"
        />
        <TicketSelectorList />
      </div>
      <OrderSummary>
        <Button type="submit">Continue</Button>
      </OrderSummary>
    </StyledSelectTickets>
  );
};

const StyledSelectTickets = styled.form`
  display: flex;
  justify-content: space-between;

  .select-tickets {
    max-width: 46rem;
    margin-right: auto;
  }

  ${Title} {
    margin-bottom: ${({ theme }) => theme.spacing['4']};
  }

  ${Text} {
    margin-bottom: ${({ theme }) => theme.spacing['6']};
  }

  .date-picker {
    margin-bottom: ${({ theme }) => theme.spacing['8']};
  }
`;

export default SelectTickets;
