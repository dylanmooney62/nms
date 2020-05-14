import Spinner from '../components/common/Spinner';
import Overlay from '../components/common/Overlay';

import React from 'react';

const Loading = () => (
  <Overlay>
    <Spinner />
  </Overlay>
);

export default Loading;
