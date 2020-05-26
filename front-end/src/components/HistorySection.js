import React from 'react';
import styled from 'styled-components';
import Container from './common/Container';
import SectionTitle from './common/SectionTitle';
import Text from './common/Text';
import Edinburgh from '../assets/images/edinburgh.png';

const HistorySection = () => {
  return (
    <StyledHistorySection>
      <Container>
        <SectionTitle title="National Museum of Scotland" subtitle="History" />
        <div className="grid">
          <div className="text-box">
            <Text>
              The National Museum of Scotland was formed in 2006 and merged with
              the new Museum of Scotland. The National Museum of Scotland has
              many collections relating to science, world cultures, and history.
            </Text>
            <Text>
              The National Museum of Scotland can be said to have begun in 1780
              with the foundation of the Society of Antiquaries of Scotland.
              This collection continues but was transferred to the government in
              1858 as the National Museum of Antiquities of Scotland.
            </Text>
          </div>
          <img src={Edinburgh} alt="City of Edinburgh" />
          <div className="text-box">
            <Text>
              The Museum has had numerous extensions over the years,
              particularly in the 1930s when an extension was added to the rear
              of the building, extending the museum greatly.
            </Text>
            <Text>
              16 new galleries were opened in 2011 including 8,000 objects. One
              of the most interesting exhibits is the stuffed body of dolly the
              sheep which is the fist successful cloning of a mammal from an
              adult cell. Other notable highlights include ancient Egyptian
              artifacts and one of Elton John's suits.
            </Text>
          </div>
        </div>
      </Container>
    </StyledHistorySection>
  );
};

export default HistorySection;

const StyledHistorySection = styled.section`
  padding-top: ${({ theme }) => theme.spacing['10']};
  padding-bottom: ${({ theme }) => theme.spacing['11']};

  @media (max-width: 570px) {
    padding-top: ${({ theme }) => theme.spacing['8']};
    padding-bottom: ${({ theme }) => theme.spacing['8']};
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr;
    grid-column-gap: ${({ theme }) => theme.spacing['8']};

    margin-top: ${({ theme }) => theme.spacing['9']};

    @media (max-width: 1140px) {
      grid-template-columns: 1fr;
      max-width: ${({ theme }) => theme.spacing['15']};
      margin-left: auto;
      margin-right: auto;
    }

    @media (max-width: 570px) {
      margin-top: ${({ theme }) => theme.spacing['8']};
    }
  }

  .text-box {
    &:first-child {
      @media (max-width: 1140px) {
        margin-bottom: ${({ theme }) => theme.spacing['6']};
      }
    }
  }

  ${Text} {
    &:first-child {
      margin-bottom: ${({ theme }) => theme.spacing['5']};
    }
  }

  img {
    width: 100%;
    object-fit: contain;
    margin: 0 auto;

    @media (max-width: 1140px) {
      grid-row: 1;
      width: 66%;
      margin-bottom: ${({ theme }) => theme.spacing['8']};
    }
  }
`;
