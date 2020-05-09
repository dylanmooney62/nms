import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Title from './Title';
import Subtitle from './Subtitle';

const SectionTitle = ({ title, subtitle, variant, align, className }) => {
  return (
    <StyledSectionTitle align={align} variant={variant} className={className}>
      <Subtitle variant={variant}>{subtitle}</Subtitle>
      <Title
        variant="h2"
        as="h2"
        color={variant === 'secondary' ? 'white' : ''}
      >
        {title}
      </Title>
    </StyledSectionTitle>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  variant: PropTypes.string,
  align: PropTypes.string,
};

SectionTitle.defaultProps = {
  variant: 'primary',
  align: 'center',
};

const StyledSectionTitle = styled.div`
  text-align: ${(props) => props.align};
`;

export default SectionTitle;
