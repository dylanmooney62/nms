import React from 'react';
import styled from 'styled-components';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import EventAbout from './EventAbout';
import EventKeyInfo from './EventKeyInfo';

const EventDetailsSection = ({
  id,
  ticketed,
  ticketPrice,
  title,
  subtitle,
  banner,
  description,
  dates,
  ageLimit,
}) => {
  return (
    <StyledEventDetailsSection>
      <SectionTitle title={title} subtitle={subtitle} />
      <Container>
        <img src={banner} alt="" />
        <div className="grid">
          <EventAbout id={id} description={description} ticketed={ticketed} />
          <EventKeyInfo
            dates={dates}
            ageLimit={ageLimit}
            ticketed={ticketed}
            ticketPrice={ticketPrice}
          />
        </div>
      </Container>
    </StyledEventDetailsSection>
  );
};

const StyledEventDetailsSection = styled.section`
  padding-top: ${({ theme }) => theme.spacing['9']};
  padding-bottom: ${({ theme }) => theme.spacing['10']};
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  z-index: 100;

  @media (max-width: 570px) {
    padding-top: ${({ theme }) => theme.spacing['8']};
    padding-bottom: ${({ theme }) => theme.spacing['8']};
  }

  ${Container} {
    margin-top: ${({ theme }) => theme.spacing['9']};

    @media (max-width: 570px) {
      margin-top: ${({ theme }) => theme.spacing['8']};
    }
  }

  img {
    width: 100%;
    margin: 0 auto;
    max-height: 40rem;
    object-fit: cover;
    object-position: center;
    margin-bottom: ${({ theme }) => theme.spacing['8']};
    border-radius: 0.8rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: ${({ theme }) => theme.spacing['8']};

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: ${({ theme }) => theme.spacing['6']};

      ul {
        grid-row: 1/2;
      }
    }
  }
`;

export default EventDetailsSection;
