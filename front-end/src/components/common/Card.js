import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import Title from './Title';
import Text from './Text';

const Card = ({
  title,
  type,
  openingDate,
  closingDate,
  imgUrl,
  description,
  slug,
}) => {
  return (
    <StyledCard as={Link} to={`/exhibitions-events/${slug}`}>
      <div className="card-top">
        <img src={imgUrl} alt="" />
        <div className="type">{type}</div>
      </div>
      <div className="card-bottom">
        <Title variant="h4" as="h3">
          {title}
        </Title>
        <div className="dates">
          <time>{openingDate}</time>
          <span>-</span>
          <time>{closingDate}</time>
        </div>
        <Text>{description}</Text>
      </div>
    </StyledCard>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  openingDate: PropTypes.string.isRequired,
  closingDate: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

const StyledCard = styled.div`
  display: block;
  text-decoration: none !important;
  width: 26.4rem;
  cursor: pointer;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  height: 40rem;

  border: none;
  overflow: hidden;
  border-radius: 0.3rem;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    img {
      transform: scale3d(1.1, 1.1, 1.1);
    }
  }

  .card-top {
    position: relative;
    height: ${({ theme }) => theme.spacing['11']};
    overflow: hidden;
  }

  img {
    transform-origin: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .type {
    position: absolute;
    top: ${({ theme }) => theme.spacing['2']};
    right: ${({ theme }) => theme.spacing['2']};
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    border-radius: 10rem;
    font-family: ${({ theme }) => theme.typography.headings};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing['2']};
    padding-left: ${({ theme }) => theme.spacing['3']};
    padding-right: ${({ theme }) => theme.spacing['3']};
    background-color: ${({ theme }) => theme.colors['purple-orchid']};
    line-height: 1.4;
    font-weight: 900;
  }

  .card-bottom {
    padding: ${({ theme }) => theme.spacing['3']};
    padding-top: ${({ theme }) => theme.spacing['6']};
    padding-bottom: ${({ theme }) => theme.spacing['6']};
    text-align: center;
    border: 0.1rem solid ${({ theme }) => theme.colors['grey-platinum']};
    flex: 1;
  }

  .dates {
    font-family: ${({ theme }) => theme.typography.headings};
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    font-weight: 900;

    letter-spacing: 0.3rem;
    color: ${({ theme }) => theme.colors['purple-orchid']};
    margin-bottom: ${({ theme }) => theme.spacing['4']};

    span {
      margin-left: ${({ theme }) => theme.spacing['1']};
      margin-right: ${({ theme }) => theme.spacing['1']};
    }

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  ${Text} {
    font-size: 1.2rem;
    text-align: center;
  }
`;

export default Card;
