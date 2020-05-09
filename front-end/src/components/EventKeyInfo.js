import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import DateSpan from './common/DateSpan';

const EventKeyInfo = ({ dates, ageLimit, ticketed, ticketPrice }) => {
  const getAge = (age) => {
    if (age >= 18) {
      return `Over 18's`;
    } else if (age === 12) {
      return `Over 12's`;
    } else {
      return `For all ages`;
    }
  };

  return (
    <StyledEventKeyInfo>
      <ul>
        <li>
          <FontAwesomeIcon
            className="icon"
            icon={faCalendarAlt}
            title="Opening and closing date"
          />
          <DateSpan className="dates" dates={dates} />
        </li>
        <li>
          <FontAwesomeIcon
            className="icon"
            icon={faUsers}
            title="Age limit of event"
          />
          <p>{getAge(ageLimit)}</p>
        </li>
        <li>
          <FontAwesomeIcon
            className="icon"
            icon={faTicketAlt}
            title="Standard ticket price"
          />
          {ticketed ? (
            <p>£{ticketPrice.adult} Standard Adult</p>
          ) : (
            <p>Free Admission on Entry</p>
          )}
        </li>
      </ul>
    </StyledEventKeyInfo>
  );
};

const StyledEventKeyInfo = styled.ul`
  ul {
    list-style: none;
    padding: 0 ${({ theme }) => theme.spacing['4']};
  }

  li {
    display: flex;
    align-items: center;
    font-family: ${({ theme }) => theme.typography.headings};
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors['grey-raisin']};
    margin-bottom: ${({ theme }) => theme.spacing['6']};
  }

  .dates {
    font-size: 1.6rem;
    margin-bottom: 0;
  }

  .icon {
    color: ${({ theme }) => theme.colors['purple-orchid']};
    margin-right: ${({ theme }) => theme.spacing['6']};
    font-size: 2.4rem;
    width: 3rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

export default EventKeyInfo;
