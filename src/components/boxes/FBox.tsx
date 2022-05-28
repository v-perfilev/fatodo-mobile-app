import React from 'react';
import {Box, IBoxProps} from 'native-base';

type FBoxProps = IBoxProps;

const FBox = ({children, ...props}: FBoxProps) => {
  return (
    <Box flex={1} {...props}>
      {children}
    </Box>
  );
};

export default FBox;
