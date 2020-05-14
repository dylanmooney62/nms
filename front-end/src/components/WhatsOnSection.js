import React from 'react';
import styled from 'styled-components';
import SectionTitle from './common/SectionTitle';
import Button from './common/Button';
import EventsLink from './common/EventsLink';
import AsyncCardList from './common/AsyncCardList';
import useEvents from '../hooks/useEvents';

const WhatsOnSection = () => {
  const [loading, events] = useEvents('?limit=4');

  return (
    <StyledWhatsOnSection>
      <SectionTitle
        align="center"
        title="Exhibitions & Events"
        subtitle="What's On"
      />
      <AsyncCardList
        className="card-list"
        loading={loading}
        events={events}
        limit={4}
      />
      <div className="button-container">
        <Button variant="primary" as={EventsLink}>
          View All
        </Button>
      </div>
    </StyledWhatsOnSection>
  );
};

export default WhatsOnSection;

const StyledWhatsOnSection = styled.section`
  padding-top: ${({ theme }) => theme.spacing['10']};
  padding-bottom: ${({ theme }) => theme.spacing['10']};

  @media (max-width: 570px) {
    padding-top: ${({ theme }) => theme.spacing['8']};
    padding-bottom: ${({ theme }) => theme.spacing['8']};
  }

  .button-container {
    display: flex;
    justify-content: center;
  }

  .card-list {
    @media (max-width: 1140px) {
      li:nth-child(4) {
        display: none;
      }
    }

    @media (max-width: 900px) {
      li:nth-child(4) {
        display: block;
      }
    }
  }
`;
