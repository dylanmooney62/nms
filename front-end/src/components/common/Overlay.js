import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Overlay = ({ className, children }) => {
  return ReactDOM.createPortal(
    <StyledOverlay className={className}>{children}</StyledOverlay>,
    document.getElementById('overlay'),
  );
};

const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000000000;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default Overlay;
