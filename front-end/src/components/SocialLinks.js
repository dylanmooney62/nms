import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

const SocialLinks = () => {
  return (
    <StyledSocialLinks>
      <Link to="/">
        <FontAwesomeIcon icon={faFacebookF} />
      </Link>
      <Link to="/">
        <FontAwesomeIcon icon={faTwitter} />
      </Link>
      <Link to="/">
        <FontAwesomeIcon icon={faInstagram} />
      </Link>
    </StyledSocialLinks>
  );
};

export default SocialLinks;

const StyledSocialLinks = styled.div`
  @media (max-width: 500px) {
    margin-bottom: ${({ theme }) => theme.spacing['6']};
  }

  a {
    display: inline-block;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.4;
    transition: all 0.3s ease-in-out;

    &:hover {
      opacity: 1;
    }

    &:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing['7']};
    }
  }
`;
