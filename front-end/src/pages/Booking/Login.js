import React, { useEffect } from 'react';
import styled from 'styled-components';
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm';

const Login = ({ onEnter, navigate }) => {
  useEffect(() => {
    onEnter(0);
  }, [onEnter]);

  return (
    <StyledLogin>
      <SignupForm navigate={navigate} />
      <LoginForm navigate={navigate} />
    </StyledLogin>
  );
};

const StyledLogin = styled.section`
  display: flex;
  justify-content: space-between;
`;

export default Login;
