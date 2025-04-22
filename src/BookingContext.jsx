// BookingContext.js
import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({});
  const [bookedSeatsMap, setBookedSeatsMap] = useState({}); // busId -> [seats]

  const updateBookingDetails = (details) => {
    setBookingDetails(details);
  };

  const updateBookedSeats = (busId, newSeats) => {
    setBookedSeatsMap((prev) => ({
      ...prev,
      [busId]: [...(prev[busId] || []), ...newSeats]
    }));
  };

  return (
    <BookingContext.Provider value={{ bookingDetails, updateBookingDetails, bookedSeatsMap, updateBookedSeats }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
