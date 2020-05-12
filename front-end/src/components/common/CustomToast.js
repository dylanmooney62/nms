import React from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = () => {
  return <StyledCustomToast />;
};

const StyledCustomToast = styled(ToastContainer)`
  .Toastify__toast {
    font-size: 1.6rem;
    font-family: ${({ theme }) => theme.typography.body};
  }

  .Toastify__toast--error {
    background-color: ${({ theme }) => theme.colors.danger.dark};
  }
`;

export default CustomToast;
