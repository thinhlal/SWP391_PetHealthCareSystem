import React, { createContext, useState, useContext } from 'react';

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => useContext(DateContext);
