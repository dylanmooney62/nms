import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { SearchHistoryContext } from '../contexts/SearchHistoryContext';
import withSideDrawer from '../hoc/withSideDrawer';
import Header from '../components/Header';
import Title from '../components/common/Title';
import Container from '../components/common/Container';
import womanMuseum from '../assets/images/woman-museum.jpg';
import EventFilterForm from '../components/EventFilterForm';
import SearchResults from '../components/SearchResults';
import Footer from '../components/Footer';
import format from 'date-fns/format';
import { createBrowserHistory } from 'history';
import api from '../api/index';

const history = createBrowserHistory();

const Events = ({ location }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setSearchHistory } = useContext(SearchHistoryContext);

  const handleSearch = useCallback(
    async (queryString) => {
      history.replace({
        pathname: '/exhibitions-events',
        search: queryString,
      });

      const query = `${queryString.replace(
        /\\?closingDate|closingDate/,
        'closingDate[gte]',
      )}&sort=openingDate`;

      try {
        const {
          data: { data: events },
        } = await api.get(`events?${query}`);

        setSearchHistory(history.location.search);
        setEvents(events);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setEvents([]);
      }
    },
    [setSearchHistory],
  );

  useEffect(() => {
    if (location?.state?.reload || !history.location.search) {
      const queryString = `closingDate=${format(Date.now(), 'yyyy-MM-dd')}`;
      handleSearch(queryString);
    } else {
      handleSearch(history.location.search.replace('?', ''));
    }
  }, [location, handleSearch]);

  return (
    <>
      <Header
        title="Exhibitions & Events"
        subtitle="Explore"
        bgImage={womanMuseum}
        style={{ backgroundPosition: 'bottom' }}
      />
      <Container>
        <TextBox>
          <Title variant="h4" as="h2">
            Search Exhibitions & Events
          </Title>
        </TextBox>
      </Container>
      <EventFilterForm
        query={history.location.search}
        onSearch={handleSearch}
        clear={location?.state?.reload || false}
      />
      <SearchResults loading={loading} events={events} />
      <Footer />
    </>
  );
};

const TextBox = styled.div`
  ${Title} {
    margin: 0;
    padding-top: ${({ theme }) => theme.spacing['6']};
    padding-bottom: ${({ theme }) => theme.spacing['6']};
  }

  .card-list {
    padding: ${({ theme }) => theme.spacing['8']} 0;
  }
`;

export default withSideDrawer(Events);
