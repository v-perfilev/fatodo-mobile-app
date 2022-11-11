import {useEffect, useRef} from 'react';

export const usePreviousValue = (value: any): any => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
