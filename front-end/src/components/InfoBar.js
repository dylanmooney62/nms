import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faCompass,
  faAddressBook,
} from '@fortawesome/free-regular-svg-icons';
import Container from './common/Container';

const InfoBar = () => (
  <StyledInfoBar>
    <Container variant="large">
      <div className="info-item">
        <FontAwesomeIcon className="icon" icon={faClock} />
        <span>
          Open:
          <time dateTime="20:00"> 10:00am</time>
          <span> - </span>
          <time dateTime="17:00">5:00pm</time>
        </span>
      </div>
      <div className="info-item">
        <FontAwesomeIcon className="icon" icon={faCompass} />
        <span>Chambers Street, Edinburgh, EH1 1JF</span>
      </div>
      <div className="info-item">
        <FontAwesomeIcon className="icon" icon={faAddressBook} />
        0300 123 63390
      </div>
    </Container>
  </StyledInfoBar>
);

const StyledInfoBar = styled.div`
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.9;
  padding: ${({ theme }) => theme.spacing['3']} 0;
  font-size: 1.2rem;
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.3);

  @media (max-width: 600px) {
    display: none;
  }

  ${Container} {
    display: flex;

    @media (max-width: 768px) {
      justify-content: space-between;
    }
  }

  .info-item:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing['7']};

    @media (max-width: 768px) {
      margin-right: ${({ theme }) => theme.spacing['5']};
    }
  }

  .icon {
    font-size: 1.2rem;
    margin-right: ${({ theme }) => theme.spacing['3']};
  }
`;

export default InfoBar;
