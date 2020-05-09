import React from 'react';
import styled from 'styled-components';
import Spinner from '../common/Spinner';
import CardList from '../common/CardList';

const AsyncCardList = ({ loading, events, fallback, limit, className }) => {
  let result;

  if (loading) {
    result = <Spinner loading={loading} />;
  } else if (events.length > 0) {
    result = <CardList events={events} />;
  } else {
    result = fallback ? (
      fallback
    ) : (
      <p className="fallback">No results found. Please try again</p>
    );
  }

  return (
    <StyledAsyncCardList className={className}>{result}</StyledAsyncCardList>
  );
};

const StyledAsyncCardList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40rem;
  padding: ${({ theme }) => theme.spacing['7']} 0;

  .fallback {
    font-size: 1.6rem;
    text-align: center;
  }
`;

export default AsyncCardList;
