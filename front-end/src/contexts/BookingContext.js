import React, { useState, createContext } from 'react';
import { format } from 'date-fns';

export const BookingContext = createContext();

const BookingContextProvider = ({ children }) => {
  const [booking, setBooking] = useState({
    date: `${format(Date.now(), 'yyyy-MM-dd')}`,
    tickets: {
      adult: 1,
      child: 0,
      student: 0,
      retired: 0,
    },
  });

  const updateBooking = ({ name, value }) => {
    setBooking({
      ...booking,
      [name]: value,
    });
  };

  const updateTickets = ({ type, quantity }) => {
    setBooking({
      ...booking,
      tickets: {
        ...booking.tickets,
        [type]: quantity,
      },
    });
  };

  return (
    <BookingContext.Provider value={{ booking, updateBooking, updateTickets }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContextProvider;
