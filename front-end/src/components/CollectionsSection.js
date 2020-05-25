import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import SectionTitle from './common/SectionTitle';
import Text from './common/Text';
import Button from './common/Button';
import painting from '../assets/images/painting.jpg';
import Container from './common/Container';

const CollectionSection = () => {
  return (
    <StyledCollectionSection>
      <Container>
        <div className="text-box">
          <SectionTitle
            align="left"
            title="Discover our Collections"
            subtitle="Explore"
          />
          <Text>
            From the ancient egyptian artifacts to Elton John's extravagant
            suit. The National Museum of Scotland has something for everyone.
            Come take a look at our online collections.
          </Text>
          <Button to="/" as={Link}>
            View Collections
          </Button>
        </div>
      </Container>
      <div className="bg-image">
        <img className="painting" src={painting} alt="" />
      </div>
    </StyledCollectionSection>
  );
};

export default CollectionSection;

const StyledCollectionSection = styled.section`
  background-color: rgba(126, 42, 175, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 44vw;
  max-height: 100rem;
  min-height: ${({ theme }) => theme.spacing['16']};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: unset;
    min-height: unset;
  }

  ${Container} {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text-box {
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing['8']};
    max-width: 100rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    @media (max-width: 1024px) {
      padding: 0;
      padding-top: ${({ theme }) => theme.spacing['11']};
      padding-bottom: ${({ theme }) => theme.spacing['11']};
      max-width: unset;
      width: 100%;
    }

    @media (max-width: 570px) {
      padding-top: ${({ theme }) => theme.spacing['9']};
      padding-bottom: ${({ theme }) => theme.spacing['9']};
    }
  }

  ${Text} {
    margin-bottom: ${({ theme }) => theme.spacing['7']};
  }

  .bg-image {
    background-image: url(${painting});
    background-position: center;
    background-size: cover;
    display: block;
    position: relative;

    @media (max-width: 1024px) {
      display: none;
    }

    &:after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 10;
      left: 0;
      right: 0;
    }
  }

  img {
    position: absolute;
    z-index: 20;
    width: 80%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    object-fit: cover;
    object-position: center;
    border-radius: 0.1rem;
  }
`;
