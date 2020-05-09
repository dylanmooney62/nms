import React, { useState } from 'react';
import { useNavigate } from '@reach/router';
import styled from 'styled-components';
import v from 'validator';
import api from '../api';
import { primaryGradient } from '../styles/mixins';
import Title from './common/Title';
import Input from './common/Input';
import Button from './common/Button';
import Alert from './common/Alert';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name) {
      return 'Please enter a valid name';
    }

    if (!email || !v.isEmail(email)) {
      return 'Please enter a valid email';
    }

    if (!password) {
      return 'Please enter a valid password';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match';
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
        .post('auth/register', {
          name,
          email,
          password,
        })
        .then(() => {
          navigate('checkout');
        })
        .catch(({ response }) => {
          message = response.data.error;

          if (message === 'Duplicate field value entered') {
            message = 'User with email already exists';
          }

          setError(message);
          setTimeout(() => setError(null), 5000);
        });
    }
  };

  return (
    <StyledSignupForm>
      {error && (
        <Alert
          variant="danger"
          style={{ display: 'block', marginBottom: '1.6rem' }}
        >
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Title variant="h4" as="h2" color="white">
          Create an account
        </Title>
        <Input
          className="input"
          variant="secondary"
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="Full Name"
          autoComplete="on"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required={true}
        />
        <Input
          className="input"
          variant="secondary"
          type="email"
          name="email"
          id="email"
          label="Email"
          placeholder="Email"
          autoComplete="on"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required={true}
        />
        <Input
          variant="secondary"
          className="input"
          type="password"
          name="password"
          id="password"
          label="Password"
          placeholder="Password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required={true}
        />
        <Input
          variant="secondary"
          className="input"
          type="password"
          name="confirm-password"
          id="confirm-password"
          label="Confirm Password"
          placeholder="Password"
          autoComplete="off"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required={true}
        />
        <div className="form-bottom">
          <Button variant="secondary" type="submit">
            Create account
          </Button>
        </div>
      </form>
    </StyledSignupForm>
  );
};

const StyledSignupForm = styled.div`
  width: 100%;
  max-width: 40rem;

  ${Alert} {
    margin-bottom: ${({ theme }) => theme.spacing['4']};
  }

  form {
    padding: ${({ theme }) => theme.spacing['5']};
    border-radius: 0.1rem;
    background: ${primaryGradient};
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
  }

  ${Button} {
    margin-left: auto;
  }
`;

export default SignupForm;
