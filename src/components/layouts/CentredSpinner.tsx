import React, {FC} from 'react';
import {Center, Spinner} from 'native-base';

const CentredSpinner: FC = () => {
  return (
    <Center flex="1">
      <Spinner size="lg" />
    </Center>
  );
};

export default CentredSpinner;
