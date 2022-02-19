import React, {FC} from 'react';
import {Center, Spinner} from 'native-base';
import {ResponsiveValue} from 'native-base/src/components/types';

type CentredSpinnerProps = {
  size?: ResponsiveValue<'sm' | 'lg'>;
};

const CentredSpinner: FC<CentredSpinnerProps> = ({size = 'lg'}) => {
  return (
    <Center flex="1">
      <Spinner size={size} />
    </Center>
  );
};

export default CentredSpinner;
