import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm';

const Login = ({ onEnter, navigate }) => {
  const [hideForm, setHideForm] = useState('signup');

  useEffect(() => {
    onEnter(0);
  }, [onEnter]);

  return (
    <StyledLogin hideForm={hideForm}>
      <div className="buttons">
        <button
          className={`toggle-button ${hideForm === 'signup' && 'active'}`}
          onClick={() => {
            setHideForm('signup');
          }}
        >
          Login
        </button>
        <button
          className={`toggle-button ${hideForm === 'login' && 'active'}`}
          onClick={() => {
            setHideForm('login');
          }}
        >
          Create Account
        </button>
      </div>
      <div className="form-group">
        <SignupForm className="signup-form" navigate={navigate} />
        <LoginForm className="login-form" navigate={navigate} />
      </div>
    </StyledLogin>
  );
};

const StyledLogin = styled.section`
  .buttons {
    display: none;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing['5']};

    @media (max-width: 768px) {
      display: flex;
    }
  }

  .toggle-button {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors['grey-granite']};
    font-weight: 600;
    cursor: pointer;
    font-family: ${({ theme }) => theme.typography.headings};
    background-color: none;
    background: transparent;
    border: none;

    transition: all 0.3s 'ease-in-out';

    &.active {
      color: ${({ theme }) => theme.colors['purple-orchid']};
    }

    &:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing['6']};
    }
  }

  .form-group {
    display: flex;
  }
  /* at certain max-width if this props exists hide the form */

  @media (max-width: 768px) {
    .form-group {
      justify-content: center;
    }

    ${({ hideForm }) =>
      hideForm === 'signup'
        ? css`
            .signup-form {
              display: none;
            }
          `
        : css`
            .login-form {
              display: none;
            }
          `}
  }
`;

export default Login;
