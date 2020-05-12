import Styled, { css } from 'styled-components';

const Container = Styled.div`
  width: 100%;
  margin: 0 auto;  
  max-width: calc(120rem + 3.2rem * 2);
  padding: 0 ${({ theme }) => theme.spacing['6']};
  @media (max-width: 1024px) {
    width: 85%;
    padding: 0;
  }


  ${({ variant }) =>
    variant === 'large' &&
    css`
      max-width: 134rem;
      padding: 0 ${({ theme }) => theme.spacing['5']};

      @media (max-width: 1024px) {
        width: 90%;
        padding: 0;
      }
    `}

  ${({ variant }) =>
    variant === 'small' &&
    css`
      max-width: calc(80rem + 3.2rem * 2);
      padding: 0 ${({ theme }) => theme.spacing['5']};

      @media (max-width: 1024px) {
        width: 80%;
        padding: 0;
      }

      @media (max-width: 425px) {
        width: 85%;
        padding: 0;
      }
    `}


`;

export default Container;
