import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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

  const handleSearch = async (queryString) => {
    history.replace({
      pathname: 'exhibitions-events',
      search: queryString,
    });

    const query = `${queryString.replace(
      /\\?closingDate|closingDate/,
      'closingDate[gte]',
    )}&sort=openingDate`;

    const {
      data: { data: events },
    } = await api.get(`events?${query}`);

    setEvents(events);
    setLoading(false);
  };

  useEffect(() => {
    if (!history.location.search) {
      const queryString = `closingDate=${format(Date.now(), 'yyyy-MM-dd')}`;

      history.replace({
        pathname: 'exhibitions-events',
        search: queryString,
      });

      handleSearch(queryString);
    } else {
      handleSearch(history.location.search.replace('?', ''));
    }
  }, []);

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
      <EventFilterForm query={location.search} onSearch={handleSearch} />
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
