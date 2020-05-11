import React, { useContext } from 'react';
import { Link } from '@reach/router';
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

const EventDetail = ({ slug }) => {
  const [isLoading, events] = useEvents(`?slug=${slug}&limit=1`);
  const [eventsLoading, moreEvents] = useEvents(`?slug[ne]=${slug}&limit=2`);
  const { searchHistory } = useContext(SearchHistoryContext);

  const event = events[0];

  // reach router to navigate away

  if (isLoading) {
    return null;
  }

  if (!isLoading && !event) {
    return <div>404 - Not found</div>;
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
        events={moreEvents}
        loading={eventsLoading}
        variant={testimonials.length > 1 ? 'primary' : 'secondary'}
      />
      <LargeFooter />
    </>
  );
};

const LargeFooter = styled(Footer)`
  padding-top: ${({ theme }) => theme.spacing['12']};
`;

export default withSideDrawer(EventDetail);
