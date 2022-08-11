import React, {ForwardedRef} from 'react';
import {Box, IBoxProps} from 'native-base';

type FBoxProps = IBoxProps;

const FBox = React.forwardRef(({children, ...props}: FBoxProps, ref: ForwardedRef<typeof Box>) => {
  return (
    <Box flex={1} {...props} ref={ref}>
      {children}
    </Box>
  );
});

export default FBox;
