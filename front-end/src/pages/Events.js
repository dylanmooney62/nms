import React from 'react';
import useEvents from '../hooks/useEvents';
import styled from 'styled-components';
import withSideDrawer from '../hoc/withSideDrawer';
import Header from '../components/Header';
import Title from '../components/common/Title';
import Container from '../components/common/Container';
import womanMuseum from '../assets/images/woman-museum.jpg';
import EventFilterForm from '../components/EventFilterForm';
import SearchResults from '../components/SearchResults';
import Footer from '../components/Footer';

const Events = ({ location }) => {
  const [isLoading, events] = useEvents(
    `${location.search.replace(
      /\\?closingDate|closingDate/,
      'closingDate[gte]',
    )}&sort=openingDate`,
  );

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
      <EventFilterForm />
      <SearchResults loading={isLoading} events={events} />
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
