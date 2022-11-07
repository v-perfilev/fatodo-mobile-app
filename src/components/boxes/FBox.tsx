import React, {ForwardedRef} from 'react';
import {Box, IBoxProps} from 'native-base';

type FBoxProps = IBoxProps & {
  grow?: boolean;
};

const FBox = React.forwardRef((props: FBoxProps, ref: ForwardedRef<typeof Box>) => {
  const {grow, children, ...otherProps} = props;

  const flexGrow = grow ? 1 : 0;

  return (
    <Box flex={1} flexGrow={flexGrow} {...props} ref={ref} {...otherProps}>
      {children}
    </Box>
  );
});

export default FBox;
