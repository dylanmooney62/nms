import React from 'react';
import styled from 'styled-components';
import CustomLink from '../components/common/CustomLink';
import Title from '../components/common/Title';

const NotFound = () => {
  return (
    <StyledNotFound>
      <Title as="h1" variant="h2">
        4
        <span role="img" aria-labelledby="sad emoji">
          😵
        </span>
        4
      </Title>
      <p>This is not the page you are looking for...</p>
      <CustomLink to="/">Home</CustomLink>
    </StyledNotFound>
  );
};

const StyledNotFound = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Title} {
    font-size: 16.4rem;
    font-weight: 500;
    line-height: 1;
  }

  p {
    font-size: 1.6rem;
    margin-bottom: ${({ theme }) => theme.spacing['5']};
  }
`;

export default NotFound;
