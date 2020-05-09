import React from 'react';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';
import theme from '../../styles/theme';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = ({ className }) => {
  return (
    <div className={className}>
      <BarLoader css={override} color={theme.colors['purple-orchid']} />
    </div>
  );
};

export default Spinner;
