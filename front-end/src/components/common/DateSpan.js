import React from 'react';
import styled from 'styled-components';

const DateSpan = ({ dates, className, color }) => {
  const {
    openingDate,
    formattedOpeningDate,
    closingDate,
    formattedClosingDate,
  } = dates;

  return (
    <StyledDateSpan className={className} color={color}>
      <time dateTime={openingDate}>{formattedOpeningDate}</time>
      <span> - </span>
      <time dateTime={closingDate}>{formattedClosingDate}</time>
    </StyledDateSpan>
  );
};

const StyledDateSpan = styled.div`
  font-family: ${({ theme }) => theme.typography.headings};
  margin-bottom: ${({ theme }) => theme.spacing['7']};
  font-size: 1.4rem;
  font-weight: 500;

  @media (max-width: 570px) {
    margin-bottom: ${({ theme }) => theme.spacing['6']};
  }

  color: ${({ color, theme }) =>
    color === 'white' ? theme.colors.white : theme.colors['grey-raisin']};
`;

export default DateSpan;
