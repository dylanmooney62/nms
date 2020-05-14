import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Redirect } from '@reach/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Title from '../../components/common/Title';
import Button from '../../components/common/Button';
import { Link } from '@reach/router';

const Summary = ({ onEnter, location }) => {
  // Update stage nav to summary
  useEffect(() => {
    onEnter(3);
  }, [onEnter]);

  if (!location.state) {
    return <Redirect from="" to="../tickets" noThrow />;
  }

  const {
    summary: { email, orderNumber, date, total },
  } = location.state;

  return (
    <StyledSummary>
      <div className="circle">
        <FontAwesomeIcon className="icon" icon={faCheck} />
      </div>
      <Title as="h1" variant="h3">
        Thank you for your order
      </Title>
      <div className="summary">
        <dl className="summary-list">
          <div className="summary-item">
            <dt>Tickets will be sent to:</dt>
            <dd>{email}</dd>
          </div>
          <div className="summary-item">
            <dt>Order Number:</dt>
            <dd>{orderNumber}</dd>
          </div>
          <div className="summary-item">
            <dt>Order Date:</dt>
            <dd>{date}</dd>
          </div>
          <div className="summary-item">
            <dt>Order Total:</dt>
            <dd>£{(total / 100).toFixed(2)}</dd>
          </div>
        </dl>
      </div>
      <div className="btn-container">
        <Button as={Link} to="/">
          Back to main site
        </Button>
      </div>
    </StyledSummary>
  );
};

const StyledSummary = styled.div`
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;

  @media (max-width: 425px) {
    width: 100%;
    max-width: unset;
  }

  .circle {
    background-color: ${({ theme }) => theme.colors['purple-orchid']};
    width: ${({ theme }) => theme.spacing['8']};
    height: ${({ theme }) => theme.spacing['8']};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: ${({ theme }) => theme.spacing['5']};
  }

  .icon {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.white};
  }

  ${Title} {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing['7']};
  }

  .summary {
    display: flex;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing['8']};

    @media (max-width: 425px) {
      margin-bottom: ${({ theme }) => theme.spacing['7']};
    }
  }

  .summary-list {
    font-size: 1.6rem;
    width: 100%;
  }

  .summary-item {
    width: 100%;

    display: grid;
    grid-template-columns: 16.3rem max-content;
    justify-content: space-between;

    @media (max-width: 425px) {
      grid-template-columns: 1fr;
    }

    &:not(:last-child) {
      margin-bottom: ${({ theme }) => theme.spacing['6']};
    }

    dt {
      text-align: right;

      @media (max-width: 425px) {
        text-align: center;
        margin-bottom: ${({ theme }) => theme.spacing['3']};
      }
    }

    dd {
      font-weight: 600;

      @media (max-width: 425px) {
        text-align: center;
      }
    }
  }

  .btn-container {
    display: flex;
    justify-content: center;
  }
`;

export default Summary;
