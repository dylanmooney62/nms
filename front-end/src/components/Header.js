import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InfoBar from './InfoBar';
import Container from './common/Container';
import NavBar from './Navbar';
import Subtitle from './common/Subtitle';
import Title from './common/Title';

const Header = ({ title, subtitle, bgImage, children, large }) => (
  <StyledHeader bgImage={bgImage} large={large}>
    <InfoBar />
    <NavBar />
    <Container>
      <div className="text-box">
        <Subtitle variant="secondary">{subtitle}</Subtitle>
        <Title variant="h1" as="h1" color="white" className="header-title">
          {title}
        </Title>
        {children}
      </div>
    </Container>
  </StyledHeader>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  bgImage: PropTypes.string.isRequired,
};

const StyledHeader = styled.header`
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${({ bgImage }) => bgImage});
  background-size: cover;

  max-height: 100rem;

  @media (max-width: 768px) {
    max-height: 80vh;
  }

  background-position: center;

  height: ${({ large, theme }) => (large ? '100vh' : theme.spacing['16'])};

  ${Container} {
    &:nth-child(3) {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }

  .text-box {
    margin-top: -${({ theme }) => theme.spacing['12']};
  }
`;

export default Header;
