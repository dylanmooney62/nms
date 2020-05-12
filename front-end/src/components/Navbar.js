import React, { useContext } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { DrawerContext } from '../contexts/DrawerContext';
import EventsLink from './common/EventsLink';
import Container from './common/Container';
import Logo from './common/Logo';

const Navbar = () => {
  const { toggleDrawer } = useContext(DrawerContext);

  return (
    <StyledNavbar>
      <Container variant="large" className="nav-container">
        <Link to="/">
          <Logo />
        </Link>
        <ul>
          <li>
            <EventsLink>Exhibitions & Events</EventsLink>
          </li>
          <li>
            <Link to="/">Collections</Link>
          </li>
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="/">Blog</Link>
          </li>
        </ul>
        <button type="button" className="hamburger" onClick={toggleDrawer}>
          <FontAwesomeIcon className="icon" icon={faBars} />
        </button>
      </Container>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  .logo {
    width: 5rem;
    height: 5rem;
    background-color: white;
  }

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: ${({ theme }) => theme.spacing['6']};
    padding-bottom: ${({ theme }) => theme.spacing['6']};
  }

  ul {
    display: flex;
    list-style: none;

    @media (max-width: 1024px) {
      display: none;
    }
  }

  li:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing['8']};
  }

  a {
    color: ${({ theme }) => theme.colors.white};
    display: inline-block;
    font-family: ${({ theme }) => theme.typography.headings};
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    text-decoration: none;
    opacity: 0.9;

    transition: all 0.3s ease-in-out;

    :hover {
      opacity: 1;
    }
  }

  .hamburger {
    cursor: pointer;
    background: transparent;
    border: none;
    display: none;

    @media (max-width: 1024px) {
      display: block;
    }

    :focus {
      outline: none;
    }
  }

  .hamburger .icon {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default Navbar;
