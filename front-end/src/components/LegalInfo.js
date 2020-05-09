import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

const LegalInfo = () => {
  return (
    <StyledLegalInfo>
      <p className="copyright">
        <small>&copy; {new Date().getFullYear()} Dylan Mooney</small>
      </p>
      <Link to="/">Privacy Policy</Link>
      <Link to="/">Legal</Link>
    </StyledLegalInfo>
  );
};

const StyledLegalInfo = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing['6']};
  }

  .copyright {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.9;

    small {
      line-height: 1.7;
    }
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.7;
    transition: all 0.3s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }
`;

export default LegalInfo;
