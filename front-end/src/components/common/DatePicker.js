import React from 'react';
import styled from 'styled-components';
import { enGB } from 'date-fns/locale';
import format from 'date-fns/format';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Input from '../common/Input';

registerLocale('en-GB', enGB);

const CustomDatePicker = ({
  label,
  className,
  onChange,
  name,
  id,
  variant,
  startDate,
  selected,
  ...innerProps
}) => {
  const handleChange = (date) => {
    onChange({ name, value: format(date, 'yyyy-MM-dd') });
  };

  return (
    <StyledDatePicker className={className}>
      <DatePicker
        selected={selected}
        onChange={(date) => handleChange(date)}
        locale="en-GB"
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
        showPopperArrow={false}
        inputProps={{ readOnly: true }}
        {...innerProps}
        dateFormat="dd/MM/yyyy"
        customInput={
          <Input
            variant={variant}
            label={label}
            icon={faCalendarAlt}
            style={{ cursor: 'pointer' }}
          />
        }
      />
    </StyledDatePicker>
  );
};

const StyledDatePicker = styled.div`
  flex: 1;

  .react-datepicker {
    font-size: 1.2rem;
    font-family: ${({ theme }) => theme.typography.body};
    border: none;
    border-radius: 0.1rem;
    z-index: 1000;

    &-wrapper {
      width: 100%;
    }

    &-popper {
      border: none;
      z-index: 1000;
    }

    &__triangle {
      border-top-color: red;
    }

    &__navigation {
      top: 1.5rem;

      &--next {
        right: 1.2rem;
      }

      &--previous {
        left: 1.2rem;
      }
    }

    &__header {
      border-radius: 0.1rem;
      background-color: ${({ theme }) => theme.colors['purple-orchid']};
      border: none;
      padding: 1.2rem;
    }

    &__current-month {
      font-size: 1.2rem;
      /* padding: 1.2rem; */
      margin-bottom: 1.6rem;
      color: ${({ theme }) => theme.colors.white};
    }

    &__day-names {
      font-size: 1.2rem;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      justify-items: center;
    }

    &__day-name {
      margin: 0;
      width: unset;
      color: ${({ theme }) => theme.colors.white};
    }

    &__day {
      width: 5rem;
      height: 5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 0;
      color: ${({ theme }) => theme.colors['grey-platinum']};
      margin: 0;

      &--keyboard-selected {
        background-color: inherit;
      }

      &:hover {
        background-color: ${({ theme }) => theme.colors['purple-orchid']};
      }

      &--selected {
        background-color: ${({ theme }) => theme.colors['purple-orchid']};
      }

      &--disabled {
        color: ${({ theme }) => theme.colors['grey-granite']};

        :hover {
          background: none;
        }
      }
    }

    &__month {
      border: none;
      padding: 1.2rem;
      margin: 0;
    }

    &__month-container {
      background-color: ${({ theme }) => theme.colors['grey-licorice']};
    }
  }
`;

export default CustomDatePicker;
