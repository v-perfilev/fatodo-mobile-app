import React, {ComponentType, FC, ReactElement} from 'react';
import {Box} from 'native-base';

const withContainer =
  (Component: ComponentType): FC =>
  (props): ReactElement => {
    return (
      <Box flex={1}>
        <Component {...props} />
      </Box>
    );
  };

export default withContainer;
