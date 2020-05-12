import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { DrawerContext } from '../contexts/DrawerContext';

const SideDrawer = () => {
  const { toggleDrawer } = useContext(DrawerContext);

  const handleClick = () => {
    toggleDrawer();
  };

  return (
    <StyledSideDrawer>
      <div className="drawer">
        <ul>
          <li>
            <Link to="/exhibitions-events" onClick={handleClick}>
              <span>Exhibitions & Events</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </li>
          <li>
            <Link to="/" onClick={handleClick}>
              <span>Collections</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </li>
          <li>
            <Link to="/" onClick={handleClick}>
              <span>Shop</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </li>
          <li>
            <Link to="/" onClick={handleClick}>
              <span>Blog</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </li>
        </ul>
      </div>
    </StyledSideDrawer>
  );
};

export default SideDrawer;

const StyledSideDrawer = styled.div`
  position: relative;

  ul {
    list-style: none;
    width: ${({ theme }) => theme.spacing['12']};
    position: absolute;
    height: 100%;
    background-color: ${({ theme }) => theme.colors['purple-regalia']};
  }

  li {
    display: block;
  }

  a {
    font-family: ${({ theme }) => theme.typography.headings};
    font-size: 1.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    font-weight: 700;
    padding: ${({ theme }) => theme.spacing['5']};
    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.3);

    transition: all 0.3s ease-in-out;

    :hover {
      background-color: ${({ theme }) => theme.colors['purple-rain']};
    }
  }
`;
