import React, {ComponentType} from 'react';
import {Box} from 'native-base';

const withContainer = (Component: ComponentType) => (props: any) => {
  return (
    <Box flex={1}>
      <Component {...props} />
    </Box>
  );
};

export default withContainer;
