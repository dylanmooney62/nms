import React, { useState } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import v from 'validator';
import api from '../api';
import Title from './common/Title';
import Input from './common/Input';
import Button from './common/Button';
import Alert from './common/Alert';

const LoginForm = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email || !v.isEmail(email)) {
      return 'Please enter a valid email';
    }

    if (!password) {
      return 'Please enter password';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let message = validateForm();

    if (message) {
      setError(message);
      setTimeout(() => setError(null), 5000);
    } else {
      api
        .post('auth/login', {
          email,
          password,
        })
        .then((res) => {
          navigate('tickets');
        })
        .catch(({ response }) => {
          message = response.data.error;
          setError(message);
          setTimeout(() => setError(null), 5000);
        });
    }
  };

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Title variant="h4" as="h2" color="secondary">
        Members Login
      </Title>
      <Input
        className="input"
        type="email"
        name="email"
        id="email"
        label="Email"
        placeholder="Email"
        autoComplete="on"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Input
        className="input"
        type="password"
        name="password"
        id="password"
        label="Password"
        placeholder="Password"
        autoComplete="on"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="form-bottom">
        <Link to="/forgotpassword" className="forgot-password">
          Forgot your password?
        </Link>
        <Button type="submit">Login</Button>
      </div>
    </StyledLoginForm>
  );
};

const StyledLoginForm = styled.form`
  width: 100%;
  max-width: 40rem;
  padding: ${({ theme }) => theme.spacing['5']};
  border-radius: 0.1rem;

  ${Alert} {
    margin-bottom: ${({ theme }) => theme.spacing['4']};
  }

  ${Title} {
    margin-bottom: ${({ theme }) => theme.spacing['5']};
  }

  .input {
    margin-bottom: ${({ theme }) => theme.spacing['4']};
  }

  .form-bottom {
    margin-top: ${({ theme }) => theme.spacing['6']};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .forgot-password {
    font-size: 1.2rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors['purple-orchid']};
    transition: all 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors['purple-regalia']};
    }
  }
`;

export default LoginForm;
