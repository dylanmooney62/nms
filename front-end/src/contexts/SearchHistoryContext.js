import React, { createContext, useState, useEffect } from 'react';

export const SearchHistoryContext = createContext();

const SearchHistoryContextProvider = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(window.localStorage.getItem('search')) || '',
  );

  useEffect(() => {
    window.localStorage.setItem('search', JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <SearchHistoryContext.Provider value={{ searchHistory, setSearchHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};

export default SearchHistoryContextProvider;
