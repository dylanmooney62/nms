import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Label from './Label';

const Input = React.forwardRef(
  ({ variant, icon, label, id, className, ...innerProps }, ref) => {
    return (
      <StyledInput variant={variant} className={className}>
        {label && (
          <Label htmlFor={id} variant={variant}>
            {label}
          </Label>
        )}
        <div className="wrapper">
          <input type="text" {...innerProps} ref={ref} id={id} />
          {icon && <FontAwesomeIcon className="icon" icon={icon} />}
        </div>
      </StyledInput>
    );
  },
);

const StyledInput = styled.div`
  position: relative;

  .wrapper {
    min-height: 4.1rem;
    position: relative;
  }

  input {
    width: 100%;
    font-size: 1.2rem;
    z-index: 20;
    height: 100%;
    min-height: 4.1rem;
    padding-left: ${({ theme }) => theme.spacing['3']};
    border: 0.1rem solid ${({ theme }) => theme.colors['grey-platinum']};
    color: ${({ theme }) => theme.colors['grey-raisin']};

    ::placeholder {
      color: ${({ theme }) => theme.colors['grey-granite']};
    }
  }

  .icon {
    position: absolute;

    top: 50%;
    transform: translateY(-50%);
    right: ${({ theme }) => theme.spacing['3']};
    font-size: 1.6rem;
    z-index: 10;
    transition: all 0.3s;
    color: ${({ theme }) => theme.colors['purple-orchid']};
    pointer-events: none;
  }

  ${({ variant }) =>
    variant === 'secondary' &&
    css`
      input {
        background-color: transparent;
        color: ${({ theme }) => theme.colors.white};
        border: 0.1rem solid ${({ theme }) => theme.colors.white};

        ::placeholder {
          color: rgba(255, 255, 255, 0.8);
        }

        &:hover {
          border-color: ${({ theme }) => theme.colors['grey-platinum']};
        }
      }

      .icon {
        color: ${({ theme }) => theme.colors.white};
      }
    `}
`;

export default Input;
