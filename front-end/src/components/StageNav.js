import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Container from './common/Container';

const StageNav = ({ stage }) => {
  return (
    <StyledStageNav>
      <Container variant="small">
        <ul>
          <StageItem active={stage === 0 ? 1 : 0}>Login</StageItem>
          <li>
            <FontAwesomeIcon className="icon" icon={faChevronRight} />
          </li>
          <StageItem active={stage === 1 ? 1 : 0}>Tickets</StageItem>
          <li>
            <FontAwesomeIcon className="icon" icon={faChevronRight} />
          </li>
          <StageItem active={stage === 2 ? 1 : 0}>Checkout</StageItem>
          <li>
            <FontAwesomeIcon className="icon" icon={faChevronRight} />
          </li>
          <StageItem active={stage === 3 ? 1 : 0}>Summary</StageItem>
        </ul>
      </Container>
    </StyledStageNav>
  );
};

export default StageNav;

const StyledStageNav = styled.nav`
  padding: ${({ theme }) => theme.spacing['8']} 0;
  border-top: 0.1rem solid rgba(255, 255, 255, 0.4);

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing['7']} 0;
  }

  @media (max-width: 425px) {
    padding: ${({ theme }) => theme.spacing['6']} 0;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .icon {
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.7;
  }
`;

const StageItem = styled.li`
  font-family: ${({ theme }) => theme.typography.headings};
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  text-decoration: none;
  opacity: 0.5;
  transition: all 0.3s ease-in-out;

  @media (max-width: 425px) {
    font-size: 1.2rem;
  }

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
    `}
`;
