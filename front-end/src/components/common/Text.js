import styled from 'styled-components';

const Text = styled.p`
  font-size: 1.4rem;
  color: ${({ color, theme }) =>
    color === 'white' ? theme.colors.white : theme.colors['grey-granite']};
  line-height: 2;
`;

export default Text;
