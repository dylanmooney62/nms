import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { primaryGradient } from '../styles/mixins';
import SectionTitle from './common/SectionTitle';
import Text from './common/Text';
import Button from './common/Button';
import Container from './common/Container';
import girlTelescope from '../assets/images/girl-telescope.png';

const MembershipCta = () => {
  return (
    <StyledMembershipCta>
      <Container>
        <div className="img-container">
          <img src={girlTelescope} alt="" />
        </div>
        <div className="text-box">
          <SectionTitle
            title="Become a Member"
            subtitle="Support"
            align="left"
            variant="secondary"
          />
          <Text color="white">
            Loving your time at the museum? Support us today to help us
            introduce new exhibitions and events to the museum. Members also
            receive a 10% discount on all products and tickets.
          </Text>
          <Button variant="secondary" as={Link} to="/">
            Join Now
          </Button>
        </div>
      </Container>
    </StyledMembershipCta>
  );
};

const StyledMembershipCta = styled.section`
  background: ${primaryGradient};

  ${Container} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${({ theme }) => theme.spacing['3']};

    @media (max-width: 1140px) {
      grid-template-columns: 1fr;
    }
  }

  .text-box {
    width: 100%;
    max-width: ${({ theme }) => theme.spacing['14']};

    margin-left: auto;
    align-items: center;
    padding-top: ${({ theme }) => theme.spacing['11']};
    padding-bottom: ${({ theme }) => theme.spacing['11']};

    @media (max-width: 1024px) {
      padding: 0;
      padding-top: ${({ theme }) => theme.spacing['11']};
      padding-bottom: ${({ theme }) => theme.spacing['11']};
      max-width: unset;
      width: 100%;
    }

    @media (max-width: 570px) {
      padding-top: ${({ theme }) => theme.spacing['9']};
      padding-bottom: ${({ theme }) => theme.spacing['9']};
    }
  }

  ${Text} {
    margin-bottom: ${({ theme }) => theme.spacing['7']};
  }

  .img-container {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1140px) {
      display: none;
    }
  }

  img {
    filter: opacity(30%);
    width: 100%;
  }
`;

export default MembershipCta;
