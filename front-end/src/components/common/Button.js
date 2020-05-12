import styled, { css } from 'styled-components';

const Button = styled.button`
  font-family: ${({ theme }) => theme.typography.headings};
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-block;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  padding-top: ${({ theme }) => theme.spacing['4']};
  padding-bottom: ${({ theme }) => theme.spacing['4']};
  padding-left: ${({ theme }) => theme.spacing['7']};
  padding-right: ${({ theme }) => theme.spacing['7']};

  background-color: ${({ theme }) => theme.colors['purple-orchid']};
  color: ${({ theme }) => theme.colors.white};
  border: 0.2rem solid ${({ theme }) => theme.colors['purple-orchid']};

  :hover {
    background-color: ${({ theme }) => theme.colors['purple-regalia']};
    border: 0.2rem solid ${({ theme }) => theme.colors['purple-regalia']};
  }

  :disabled {
    cursor: not-allowed;
    border: 0.2rem solid ${({ theme }) => theme.colors['grey-granite']};
    background-color: ${({ theme }) => theme.colors['grey-granite']};
  }

  ${({ variant }) =>
    variant === 'secondary' &&
    css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.white};
      border: 0.2rem solid ${({ theme }) => theme.colors.white};

      :hover {
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors['purple-orchid']};
        border: 0.2rem solid ${({ theme }) => theme.colors.white};
      }
    `};
`;

export default Button;
