import styled from 'styled-components';
import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomLink = ({ to, icon, children, ...innerProps }) => {
  return (
    <StyledCustomLink to={to} {...innerProps}>
      {icon && <FontAwesomeIcon className="icon" icon={icon} />}
      {children}
    </StyledCustomLink>
  );
};

const StyledCustomLink = styled(Link)`
  color: ${({ theme }) => theme.colors['purple-orchid']};
  font-size: 1.6rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  font-weight: 600;
  display: flex;
  align-items: center;
  display: inline-block;

  &:hover {
    color: ${({ theme }) => theme.colors['purple-regalia']};
  }

  .icon {
    margin-right: ${({ theme }) => theme.spacing['4']};
  }
`;

export default CustomLink;
