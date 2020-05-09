import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card';
import Container from './Container';

const CardList = ({ events, className }) => {
  return (
    <StyledCardList className={className}>
      <ul>
        {events.map(
          ({
            _id,
            name,
            type,
            formattedOpeningDateSmall,
            formattedClosingDateSmall,
            thumbnail,
            shortDescription,
            slug,
          }) => (
            <li key={_id}>
              <Card
                title={name}
                type={type}
                openingDate={formattedOpeningDateSmall}
                closingDate={formattedClosingDateSmall}
                imgUrl={thumbnail}
                description={shortDescription}
                slug={slug}
              />
            </li>
          ),
        )}
      </ul>
    </StyledCardList>
  );
};

CardList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const StyledCardList = styled(Container)`
  ul {
    list-style: none;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing['6']};

    @media (max-width: 1140px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 500px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  li {
    height: 100%;
  }
`;

export default CardList;
