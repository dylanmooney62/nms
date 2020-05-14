import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html {
    font-size: 62.5%;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%; 

    @media (max-width: 768px) {
      font-size: 56.25%;
    }

    @media (max-width: 320px) {
      font-size: 50%;
    }
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  
  body {
    font-family: 'Open Sans', sans-serif;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #root {
    flex: 1;
    display: flex;
    flex-direction: column;

    & > div {
      flex: 1;
    }
  }
  

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Poppins', sans-serif;
  }


 
`;

export default GlobalStyle;
