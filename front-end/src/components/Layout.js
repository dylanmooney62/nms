import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import SideDrawer from './SideDrawer';
import { DrawerContext } from '../contexts/DrawerContext';

const Layout = ({ children }) => {
  const { isOpen } = useContext(DrawerContext);

  return (
    <StyledLayout drawerOpen={isOpen}>
      <div className="page">
        <div className="content">{children}</div>
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

    ${(props) =>
      props.drawerOpen &&
      css`
        /* width of drawer */
        transform: translateX(-25.5rem);
      `}
  }

  .drawer-container {
    position: relative;
  }

  .content {
    width: 100%;
    position: relative;
    z-index: 100;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
