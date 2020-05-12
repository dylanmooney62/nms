import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Testimonial = ({ rating, quote, author }) => {
  return (
    <StyledTestimonial>
      <div className="rating">
        {Array(rating)
          .fill()
          .map((_, index) => (
            <FontAwesomeIcon key={index} className="icon" icon={faStar} />
          ))}
      </div>
      <q>{quote}</q>
      <p>{author}</p>
    </StyledTestimonial>
  );
};

Testimonial.propTypes = {
  rating: PropTypes.number.isRequired,
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

const StyledTestimonial = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};

  .rating {
    display: flex;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing['6']};
  }

  q {
    font-size: 3.8rem;
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing['6']};
    font-family: ${({ theme }) => theme.typography.cursive};
  }

  p {
    font-family: ${({ theme }) => theme.typography.headings};
    font-size: 1.4rem;
    opacity: 0.8;
    font-weight: 400;
    letter-spacing: 0.1rem;
  }

  .icon {
    font-size: 4.8rem;
    color: ${({ theme }) => theme.colors.white};

    @media (max-width: 768px) {
      font-size: 4rem;
    }

    @media (max-width: 425px) {
      font-size: 3.6rem;
    }

    &:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing['7']};

      @media (max-width: 768px) {
        margin-right: ${({ theme }) => theme.spacing['6']};
      }

      @media (max-width: 425px) {
        margin-right: ${({ theme }) => theme.spacing['4']};
      }
    }
  }
`;

export default Testimonial;
