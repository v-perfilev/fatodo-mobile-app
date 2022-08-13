import React from 'react';
import {IBoxProps, Spinner} from 'native-base';
import FCenter from '../boxes/FCenter';

type CentredSpinnerProps = IBoxProps;

const CentredSpinner = ({size = 'lg', ...props}: CentredSpinnerProps) => {
  return (
    <FCenter grow {...props}>
      <Spinner size={size} />
    </FCenter>
  );
};

export default CentredSpinner;
