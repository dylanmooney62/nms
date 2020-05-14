import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import DrawerContextProvider from './contexts/DrawerContext';
import BookingContextProvider from './contexts/BookingContext';
import AuthContextProvider from './contexts/AuthContext';
import SearchHistoryContextProvider from './contexts/SearchHistoryContext';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import NotFound from './pages/NotFound';
import Booking from './pages/Booking/index';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <DrawerContextProvider>
        <SearchHistoryContextProvider>
          <AuthContextProvider>
            <BookingContextProvider>
              <Router primary={false}>
                <Home path="/" />
                <Events path="exhibitions-events" />
                <EventDetail path="exhibitions-events/:slug" />
                <Booking path="/book/:id/*" />
                <NotFound default path="not-found" />
              </Router>
              <CookieBanner />
            </BookingContextProvider>
          </AuthContextProvider>
        </SearchHistoryContextProvider>
      </DrawerContextProvider>
    </ThemeProvider>
  );
}

export default App;
