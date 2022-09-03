import React from 'react';
import {IBoxProps} from 'native-base';
import FCenter from '../boxes/FCenter';
import FSpinner from '../layouts/FSpinner';

type CentredFSpinnerProps = IBoxProps;

const CentredFSpinner = ({...props}: CentredFSpinnerProps) => {
  return (
    <FCenter grow {...props}>
      <FSpinner />
    </FCenter>
  );
};

export default CentredFSpinner;
