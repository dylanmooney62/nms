import styled, { css } from 'styled-components';

const Title = styled.div`


color: ${({ color, theme }) =>
  color === 'secondary'
    ? theme.colors['purple-orchid']
    : color === 'white'
    ? theme.colors.white
    : theme.colors['grey-raisin']};




    ${({ variant }) =>
      variant === 'h1' &&
      css`
        font-size: 6.2rem;
        font-weight: 600;
        letter-spacing: 0.5rem;
        margin-bottom: ${({ theme }) => theme.spacing['5']};

        @media (max-width: 570px) {
          font-size: 10vw;
          letter-spacing: 0.3rem;
          margin-bottom: ${({ theme }) => theme.spacing['3']};
        }
      `}
      
    ${({ variant }) =>
      variant === 'h2' &&
      css`
        font-size: 4rem;
        font-weight: 400;
        margin-bottom: ${({ theme }) => theme.spacing['5']};

        @media (max-width: 768px) {
          font-size: 3.6rem;
        }

        @media (max-width: 570px) {
          font-size: 3.2rem;
        }
      `}

    ${({ variant }) =>
      variant === 'h3' &&
      css`
        font-size: 2.8rem;
        font-weight: 500;

        @media (max-width: 768px) {
          font-size: 2.4rem;
        }
      `}

    ${({ variant }) =>
      variant === 'h4' &&
      css`
        font-size: 1.8rem;
        font-weight: 500;
        margin-bottom: ${({ theme }) => theme.spacing['3']};

        /* @media (max-width: 768px) {
          font-size: 1.6rem;
        } */
      `};

`;

export default Title;
