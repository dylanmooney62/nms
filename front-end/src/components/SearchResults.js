import React from 'react';
import styled from 'styled-components';
import AsyncCardList from './common/AsyncCardList';
import Container from './common/Container';

const SearchResults = ({ loading, events }) => {
  return (
    <StyledSearchResults>
      <Container>
        {!loading && events && (
          <p className="result-count">Showing {events.length} results</p>
        )}
      </Container>
      <AsyncCardList loading={loading} events={events || []} />
    </StyledSearchResults>
  );
};

const StyledSearchResults = styled.section`
  .result-count {
    font-family: ${({ theme }) => theme.typography.headings};
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors['grey-licorice']};
    padding-top: ${({ theme }) => theme.spacing['7']};
  }
`;

export default SearchResults;
