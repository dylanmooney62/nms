import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Container from './common/Container';
import LegalInfo from './LegalInfo';
import SocialLinks from './SocialLinks';
import FOOTER_LINKS from '../data/footerLinks';

const Footer = ({ className }) => {
  return (
    <StyledFooter className={className}>
      <Container>
        <div className="grid">
          {FOOTER_LINKS.map(({ title, links }) => (
            <div className="grid-item" key={title}>
              <p className="list-title">{title}</p>
              <ul>
                {links.map(({ href, text }) => (
                  <li key={text}>
                    <Link to={href}>{text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <LegalInfo />
          <SocialLinks />
        </div>
      </Container>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.div`
  background-color: ${({ theme }) => theme.colors['grey-licorice']};

  padding-top: ${({ theme }) => theme.spacing['8']};
  padding-bottom: ${({ theme }) => theme.spacing['5']};

  .grid {
    display: grid;
    grid-template-columns: repeat(4, max-content);
    font-size: 1.4rem;
    margin-bottom: ${({ theme }) => theme.spacing['11']};
    justify-content: space-between;

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, max-content);
      justify-content: start;
      column-gap: ${({ theme }) => theme.spacing['8']};
      row-gap: ${({ theme }) => theme.spacing['6']};
      margin-bottom: ${({ theme }) => theme.spacing['8']};
    }

    @media (max-width: 500px) {
      grid-template-columns: repeat(1, max-content);
    }
  }

  .list-title {
    font-family: ${({ theme }) => theme.typography.headings};
    font-weight: 900;
    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase;
    margin-bottom: ${({ theme }) => theme.spacing['5']};
    letter-spacing: 0.1rem;
  }

  ul {
    list-style: none;
  }

  li:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing['4']};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.6;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 500px) {
      flex-direction: column-reverse;
    }
  }
`;
