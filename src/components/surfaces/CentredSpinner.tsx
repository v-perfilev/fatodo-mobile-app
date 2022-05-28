import React from 'react';
import {Spinner} from 'native-base';
import {ResponsiveValue} from 'native-base/src/components/types';
import FCenter from '../boxes/FCenter';

type CentredSpinnerProps = {
  size?: ResponsiveValue<'sm' | 'lg'>;
};

const CentredSpinner = ({size = 'lg'}: CentredSpinnerProps) => {
  return (
    <FCenter grow>
      <Spinner size={size} />
    </FCenter>
  );
};

export default CentredSpinner;
