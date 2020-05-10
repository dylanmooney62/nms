/* eslint-disable */
import { useRef, useEffect } from 'react';
const useDidUpdate = (fn, inputs) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, [...inputs]);
};

export default useDidUpdate;
