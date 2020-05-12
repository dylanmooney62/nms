import React, { useState, createContext, useEffect, useCallback } from 'react';
import { format } from 'date-fns';

export const BookingContext = createContext();

const BookingContextProvider = ({ children }) => {
  const [booking, setBooking] = useState(
    JSON.parse(window.localStorage.getItem('booking')) || {
      date: `${format(Date.now(), 'yyyy-MM-dd')}`,
      tickets: {
        adult: 0,
        child: 0,
        student: 0,
        retired: 0,
      },
    },
  );

  useEffect(() => {
    localStorage.setItem('booking', JSON.stringify(booking));
  }, [booking]);

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

  const clearBooking = useCallback(() => {
    setBooking({
      date: `${format(Date.now(), 'yyyy-MM-dd')}`,
      tickets: {
        adult: 0,
        child: 0,
        student: 0,
        retired: 0,
      },
    });
  }, []);

  return (
    <BookingContext.Provider
      value={{ booking, updateBooking, updateTickets, clearBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContextProvider;
