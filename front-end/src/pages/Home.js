import React from 'react';
import { Link } from '@reach/router';
import useEvents from '../hooks/useEvents';
import withSideDrawer from '../hoc/withSideDrawer';
import Header from '../components/Header';
import DateSpan from '../components/common/DateSpan';
import Button from '../components/common/Button';
import HistorySection from '../components/HistorySection';
import CollectionSection from '../components/CollectionsSection';
import WhatsOnSection from '../components/WhatsOnSection';
import MembershipCta from '../components/MembershipCta';
import Map from '../components/Map';
import Footer from '../components/Footer';

const Home = () => {
  const [isLoading, events] = useEvents('?limit=4');

  const event = events[0];

  if (isLoading) {
    return null;
  }

  if (!isLoading && !event) {
    return <div>404 - Not found</div>;
  }

  const {
    slug,
    name,
    type,
    hero,
    openingDate,
    formattedOpeningDate,
    closingDate,
    formattedClosingDate,
  } = event;

  const dates = {
    openingDate,
    formattedOpeningDate,
    closingDate,
    formattedClosingDate,
  };

  return (
    <>
      <Header title={name} subtitle={type} bgImage={hero} large>
        <DateSpan dates={dates} color="white" />
        <Button as={Link} to={`/exhibitions-events/${slug}`}>
          Learn More
        </Button>
      </Header>
      <HistorySection />
      <CollectionSection />
      <WhatsOnSection events={events} loading={isLoading} />
      <MembershipCta />
      <Map />
      <Footer />
    </>
  );
};

export default withSideDrawer(Home);
