import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import NotFound from './pages/NotFound';
import DrawerContextProvider from './contexts/DrawerContext';
import BookingContextProvider from './contexts/BookingContext';
import AuthContextProvider from './contexts/AuthContext';
import Booking from './pages/Booking/index';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <DrawerContextProvider>
          <AuthContextProvider>
            <BookingContextProvider>
              <Router>
                <Home path="/" />
                <Events path="exhibitions-events" />
                <EventDetail path="exhibitions-events/:slug" />
                <Booking path="/book/:id/*" />
                <NotFound default />
              </Router>
            </BookingContextProvider>
          </AuthContextProvider>
        </DrawerContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
