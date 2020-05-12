import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import SideDrawer from './SideDrawer';
import { DrawerContext } from '../contexts/DrawerContext';

const Layout = ({ children }) => {
  const { isOpen, toggleDrawer } = useContext(DrawerContext);

  const handleClick = () => {
    if (isOpen) {
      toggleDrawer();
    }
  };

  return (
    <StyledLayout drawerOpen={isOpen}>
      <div className="page">
        <div className="content" onClick={handleClick}>
          {children}
        </div>
        <SideDrawer />
      </div>
    </StyledLayout>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;

const StyledLayout = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 100vh;

  .page {
    display: flex;
    transition: all 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);

    @media (max-width: 1024px) {
      ${(props) =>
        props.drawerOpen &&
        css`
          /* width of drawer */
          transform: translateX(-25.5rem);
        `}
    }
  }

  .drawer-container {
    position: relative;
  }

  .content {
    width: 100%;
    position: relative;
    z-index: 100;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    transition: background-color 0.3s ease-in-out;

    ${({ drawerOpen }) =>
      drawerOpen &&
      css`
        &::after {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba(255, 255, 255, 0.2);
          z-index: 200;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        &:hover {
          &::after {
            background-color: rgba(255, 255, 255, 0.15);
          }
        }
      `}
  }
`;
