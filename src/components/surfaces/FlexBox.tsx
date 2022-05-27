import React from 'react';
import {Box, IBoxProps} from 'native-base';

type FlexBoxProps = IBoxProps;

const FlexBox = ({children, ...props}: FlexBoxProps) => {
  return (
    <Box flex={1} {...props}>
      {children}
    </Box>
  );
};

export default FlexBox;
