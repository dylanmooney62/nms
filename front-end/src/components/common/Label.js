import styled from 'styled-components';

const Label = styled.label`
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors['grey-raisin']};
  margin-bottom: ${({ theme }) => theme.spacing['2']};
  display: block;

  color: ${({ variant, theme }) =>
    variant === 'secondary' ? 'white' : theme.colors['grey-raisin']};
`;

export default Label;
