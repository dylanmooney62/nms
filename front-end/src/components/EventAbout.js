import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from './common/Text';
import Button from './common/Button';
import Title from './common/Title';

const EventAbout = ({ id, description, ticketed }) => {
  const paragraphs = description.split('\n');

  return (
    <StyledEventAbout>
      <Title variant="h3" as="h3">
        About
      </Title>
      {paragraphs.map((text, index) => (
        <Text key={index}>{text}</Text>
      ))}
      {ticketed && (
        <Button to={`/book/${id}`} as={Link}>
          Book Tickets
        </Button>
      )}
    </StyledEventAbout>
  );
};

EventAbout.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ticketed: PropTypes.bool.isRequired,
};

const StyledEventAbout = styled.div`
  ${Title} {
    margin-bottom: ${({ theme }) => theme.spacing['4']};
  }

  ${Text} {
    font-size: 1.6rem;
    margin-bottom: ${({ theme }) => theme.spacing['4']};
    white-space: pre-line;
  }

  ${Button} {
    margin-top: ${({ theme }) => theme.spacing['6']};
  }
`;

export default EventAbout;
