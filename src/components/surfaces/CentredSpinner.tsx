import React from 'react';
import {IBoxProps, ISpinnerProps, Spinner} from 'native-base';
import FCenter from '../boxes/FCenter';

type CentredSpinnerProps = IBoxProps & Pick<ISpinnerProps, 'color'>;

const CentredSpinner = ({size = 'lg', color, ...props}: CentredSpinnerProps) => {
  return (
    <FCenter grow {...props}>
      <Spinner size={size} color={color} />
    </FCenter>
  );
};

export default CentredSpinner;
