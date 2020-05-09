import React, { useState, createContext } from 'react';

export const DrawerContext = createContext();

const DrawerContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DrawerContext.Provider value={{ isOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerContextProvider;
