import React, {ForwardedRef} from 'react';
import {Box, IBoxProps} from 'native-base';

type FBoxProps = IBoxProps & {
  grow?: boolean;
};

const FBox = React.forwardRef((props: FBoxProps, ref: ForwardedRef<typeof Box>) => {
  const {grow = true, children, ...otherProps} = props;

  const flex = grow ? 1 : 0;
  const flexGrow = grow ? 1 : 0;

  return (
    <Box display="flex" flex={flex} flexGrow={flexGrow} {...props} ref={ref} {...otherProps}>
      {children}
    </Box>
  );
});

export default FBox;
