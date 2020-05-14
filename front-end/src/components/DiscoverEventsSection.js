import React from 'react';
import styled, { css } from 'styled-components';
import useEvents from '../hooks/useEvents';
import { primaryGradient } from '../styles/mixins';
import SectionTitle from './common/SectionTitle';
import AsyncCardList from './common/AsyncCardList';
import Container from './common/Container';

const DiscoverEventsSection = ({ variant, filter }) => {
  const [loading, events] = useEvents(`?slug[ne]=${filter}&limit=2`);

  return (
    <StyledDiscoverEventsSection variant={variant}>
      <Container>
        <SectionTitle
          title="More to Explore"
          subtitle="Discover"
          variant={variant}
          align="left"
        />
      </Container>
      <AsyncCardList events={events} loading={loading} />
    </StyledDiscoverEventsSection>
  );
};

const StyledDiscoverEventsSection = styled.div`
  margin-top: -12rem;

  ${Container} {
    transform: translateY(22rem);
  }

  ${({ variant }) =>
    variant === 'secondary' &&
    css`
      background: ${primaryGradient};
    `}
`;

export default DiscoverEventsSection;
