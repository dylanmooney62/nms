import styled from 'styled-components';

const Subtitle = styled.div`
  font-family: ${({ theme }) => theme.typography.headings};
  font-size: 1.4rem;
  font-weight: 600;
  font-style: italic;
  letter-spacing: 0.1rem;

  color: ${({ variant, theme }) =>
    variant === 'primary' ? theme.colors['purple-orchid'] : theme.colors.white};

  @media (max-width: 570px) {
    font-size: 2vw;
  }

  @media (max-width: 570px) {
    font-size: 3vw;
  }
`;

export default Subtitle;
