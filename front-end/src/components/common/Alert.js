import styled from 'styled-components';

const Alert = styled.div`
  padding: ${({ theme }) => theme.spacing['4']};
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme, variant }) => theme.colors[variant].dark};
  border: 0.1rem solid ${({ theme, variant }) => theme.colors[variant].medium};
  background-color: ${({ theme, variant }) => theme.colors[variant].light};
  border-radius: 0.3rem;
`;

export default Alert;
