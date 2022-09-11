import React from 'react';
import FCenter from '../boxes/FCenter';
import Loader from '../layouts/Loader';
import {IBoxProps} from 'native-base';

type CentredLoaderProps = IBoxProps & {
  size?: number;
};

const CentredLoader = ({size, ...props}: CentredLoaderProps) => {
  return (
    <FCenter grow {...props}>
      <Loader size={size} />
    </FCenter>
  );
};

export default CentredLoader;
