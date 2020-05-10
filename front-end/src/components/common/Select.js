import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import theme from '../../styles/theme';
import Label from './Label';

const customStyles = {
  container: (provided) => ({
    ...provided,
    flex: 1,
  }),
  control: (provided, { isFocused }) => ({
    ...provided,
    boxShadow: 'none',
    borderRadius: '0rem',
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: '1.2rem',
    fontFamily: 'Open Sans',
    cursor: 'pointer',
    border: `0.1rem solid ${theme.colors.white}`,
    '&:hover': {
      borderColor: isFocused
        ? `${theme.colors['grey-platinum']}`
        : `${theme.colors['grey-platinum']}`,
    },
    alignItems: 'center',
    display: 'flex',
    minHeight: '4.1rem',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: `${theme.colors['grey-licorice']}`,
    borderRadius: '.1rem',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  option: (provided, { isSelected, isFocused }) => ({
    ...provided,
    fontSize: '1.2rem',
    paddingTop: '1.2rem',
    paddingBottom: '1.2rem',
    color: 'white',
    backgroundColor: isSelected
      ? `${theme.colors['purple-orchid']}`
      : isFocused
      ? `${theme.colors['purple-orchid']}`
      : null,
    transition: 'all .1s ease-in-out',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorContainer: (provided) => ({
    ...provided,
    padding: '0 !important',
  }),
  placeholder: () => ({
    color: 'white',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
    paddingLeft: '1.2rem',
  }),
  singleValue: () => ({
    color: 'white',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: theme.colors.white,
    '&:hover': {
      color: theme.colors['grey-platinum'],
    },
  }),
};

const CustomSelect = ({
  options,
  label,
  className,
  variant,
  value,
  ...innerProps
}) => {
  return (
    <StyledCustomSelect className={className}>
      <Label variant={variant}>{label}</Label>
      <Select
        className="select"
        styles={customStyles}
        options={options}
        defaultValue={options[0]}
        isSearchable={false}
        value={value}
        {...innerProps}
      />
    </StyledCustomSelect>
  );
};

const StyledCustomSelect = styled.div`
  flex: 1;
`;

export default CustomSelect;
