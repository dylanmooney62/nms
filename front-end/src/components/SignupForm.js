import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import v from 'validator';
import api from '../api';
import { primaryGradient } from '../styles/mixins';
import Title from './common/Title';
import Input from './common/Input';
import Button from './common/Button';

const SignupForm = ({ navigate, className }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorMessage = validateForm();

    if (errorMessage) {
      toast.error(errorMessage, {
        toastId: 'signup-error',
      });
      return;
    }

    try {
      await api.post('auth/register', {
        name,
        email,
        password,
      });

      navigate('tickets');
    } catch ({ response }) {
      console.log(response);

      const error = response.data.error;
      if (error === 'Duplicate field value entered') {
        toast.error('User with email already exists');
      } else {
        toast.error(error);
      }
    }
  };

  return (
    <StyledSignupForm className={className}>
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
          id="signup-email"
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
          id="signup-password"
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

  @media (max-width: 768px) {
    max-width: unset;
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
