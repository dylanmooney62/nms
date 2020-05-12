import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Border } from '../../assets/svg/border.svg';
import Title from './Title';

const TicketSelector = ({ type, quantity, max, min, price, onChange }) => {
  const getDescription = (type) => {
    switch (type) {
      case 'adult':
        return 'Ages 13+';
      case 'child':
        return 'Ages 3-12';
      case 'retired':
        return 'Ages 60+';
      case 'student':
        return 'ID required';
      default:
        break;
    }
  };

  const handleDecrement = () => {
    if (quantity <= min) {
      onChange({ type, quantity });
    } else {
      onChange({
        type,
        quantity: quantity - 1,
      });
    }
  };

  const handleIncrement = () => {
    if (quantity >= max) {
      onChange({ type, quantity });
    } else {
      onChange({
        type,
        quantity: quantity + 1,
      });
    }
  };

  return (
    <StyledTicketSelector>
      <Border className="border" width="100%" />
      <div className="ticket-info">
        <Title variant="h4" as="h2">
          {type}
        </Title>
        <p className="age-range">{getDescription(type)}</p>
      </div>
      <div className="ticket-controls">
        <button
          className="ticket-control"
          type="button"
          onClick={handleDecrement}
          disabled={quantity <= min}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span className="ticket-quantity">{quantity}</span>
        <button
          className="ticket-control"
          type="button"
          onClick={handleIncrement}
          disabled={quantity >= max}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <p className="ticket-price">£{price}</p>
    </StyledTicketSelector>
  );
};

TicketSelector.propTypes = {
  type: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
};

TicketSelector.defaultProps = {
  quantity: 0,
  max: 10,
  min: 0,
};

export default TicketSelector;

const StyledTicketSelector = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['5']};
  padding-left: ${({ theme }) => theme.spacing['4']};
  padding-right: ${({ theme }) => theme.spacing['4']};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-family: ${({ theme }) => theme.typography.headings};

  .border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .ticket-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 7.7rem;

    ${Title} {
      text-transform: capitalize;
      margin-bottom: ${({ theme }) => theme.spacing['1']};
    }
  }

  .age-range {
    color: ${({ theme }) => theme.colors['purple-orchid']};
    font-weight: 500;

    font-size: 1.2rem;
    letter-spacing: 0.1rem;
  }

  .ticket-controls {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ticket-control {
    background: none;
    font-size: 1.6rem;
    border: none;
    color: ${({ theme }) => theme.colors['purple-orchid']};
    transition: all 0.1s ease-in-out;
    cursor: pointer;

    &:enabled:hover {
      color: ${({ theme }) => theme.colors['purple-regalia']};
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .ticket-quantity {
    padding-top: ${({ theme }) => theme.spacing['3']};
    padding-bottom: ${({ theme }) => theme.spacing['3']};
    width: ${({ theme }) => theme.spacing['9']};
    margin-left: ${({ theme }) => theme.spacing['6']};
    margin-right: ${({ theme }) => theme.spacing['6']};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1;
    border: 0.1rem solid ${({ theme }) => theme.colors['grey-platinum']};
    color: ${({ theme }) => theme.colors['grey-raisin']};

    @media (max-width: 425px) {
      margin-left: 10%;
      margin-right: 10%;
      padding-top: ${({ theme }) => theme.spacing['2']};
      padding-bottom: ${({ theme }) => theme.spacing['2']};
      width: 33.33%;
    }
  }

  .ticket-price {
    font-size: 1.8rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors['grey-raisin']};
    letter-spacing: 0.1rem;
  }
`;
