import React, {PropsWithChildren, Suspense, useEffect, useState} from 'react';
import CentredSpinner from '../surfaces/CentredSpinner';
import FBox from '../boxes/FBox';
import {IBoxProps} from 'native-base';
import CentredLoader from '../surfaces/CentredLoader';

type LazyLoaderProps = IBoxProps &
  PropsWithChildren<{
    fatodoLoader?: boolean;
  }>;

const LazyLoader = ({fatodoLoader, children, ...props}: LazyLoaderProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setReady(true), 0);
  }, []);

  const loader = fatodoLoader ? <CentredLoader size={50} /> : <CentredSpinner />;

  return (
    <Suspense>
      {!ready && loader}
      {ready && <FBox {...props}>{children}</FBox>}
    </Suspense>
  );
};

export default LazyLoader;
