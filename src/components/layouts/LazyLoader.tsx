import React, {PropsWithChildren, Suspense, useEffect, useState} from 'react';
import CentredSpinner from '../surfaces/CentredSpinner';
import FBox from '../boxes/FBox';
import {IBoxProps} from 'native-base';

type LazyLoaderProps = PropsWithChildren<IBoxProps>;

const LazyLoader = ({children, ...props}: LazyLoaderProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setReady(true), 0);
  }, []);

  return (
    <Suspense>
      {!ready && <CentredSpinner />}
      {ready && <FBox {...props}>{children}</FBox>}
    </Suspense>
  );
};

export default LazyLoader;
