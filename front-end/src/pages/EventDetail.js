import React, { useContext } from 'react';
import { Link, Redirect } from '@reach/router';
import styled from 'styled-components';
import withSideDrawer from '../hoc/withSideDrawer';
import useEvents from '../hooks/useEvents';
import Header from '../components/Header';
import DateSpan from '../components/common/DateSpan';
import Button from '../components/common/Button';
import EventDetailsSection from '../components/EventDetailsSection';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import DiscoverEventsSection from '../components/DiscoverEventsSection';
import BackBanner from '../components/BackBanner';
import { SearchHistoryContext } from '../contexts/SearchHistoryContext';
import Loading from './Loading';

const EventDetail = ({ slug }) => {
  const [isLoading, events] = useEvents(`?slug=${slug}&limit=1`);

  const { searchHistory } = useContext(SearchHistoryContext);

  const event = events[0];

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !event) {
    return <Redirect to="/not-found" noThrow />;
  }

  const {
    id,
    type,
    name,
    hero,
    ticketed,
    banner,
    openingDate,
    formattedOpeningDate,
    closingDate,
    formattedClosingDate,
    description,
    ageLimit,
    ticketPrice,
    testimonials,
  } = event;

  const dates = {
    openingDate,
    formattedOpeningDate,
    closingDate,
    formattedClosingDate,
  };

  return (
    <>
      <Header title={name} subtitle={type} bgImage={hero}>
        <DateSpan color="white" dates={dates} />
        {ticketed && (
          <Button to={`/book/${id}`} as={Link}>
            Book Tickets
          </Button>
        )}
      </Header>
      <BackBanner to={searchHistory} />
      <EventDetailsSection
        id={id}
        title={name}
        subtitle={type}
        banner={banner}
        description={description}
        ticketed={ticketed}
        dates={dates}
        ageLimit={ageLimit}
        ticketPrice={ticketPrice}
      />
      {testimonials.length >= 1 && <Testimonials testimonials={testimonials} />}
      <DiscoverEventsSection
        variant={testimonials.length > 1 ? 'primary' : 'secondary'}
        filter={slug}
      />
      <LargeFooter />
    </>
  );
};

const LargeFooter = styled(Footer)`
  padding-top: ${({ theme }) => theme.spacing['12']};
`;

export default withSideDrawer(EventDetail);
