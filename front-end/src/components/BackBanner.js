import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Container from './common/Container';
import { primaryGradient } from '../styles/mixins';

const BackBanner = ({ to }) => {
  return (
    <StyledBackBanner>
      <Container>
        <Link
          className="link"
          to={
            to
              ? `/exhibitions-events${to}`
              : `/exhibitions-events?closingDate=${format(
                  Date.now(),
                  'yyyy-MM-dd',
                )}`
          }
        >
          <FontAwesomeIcon className="icon" icon={faChevronLeft} />
          Back to results
        </Link>
      </Container>
    </StyledBackBanner>
  );
};

const StyledBackBanner = styled.div`
  background: ${primaryGradient};

  ${Container} {
    padding-top: ${({ theme }) => theme.spacing['5']};
    padding-bottom: ${({ theme }) => theme.spacing['5']};
  }

  .link {
    text-decoration: none;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
    transition: all 0.3s ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  }

  .icon {
    margin-right: ${({ theme }) => theme.spacing['4']};
  }
`;

export default BackBanner;
