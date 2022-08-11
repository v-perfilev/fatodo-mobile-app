import React, {useMemo} from 'react';
import {Center, ICenterProps} from 'native-base';

type FCenterProps = ICenterProps & {
  grow?: boolean;
};

const FCenter = React.forwardRef(({grow, children, ...props}: FCenterProps, ref: any) => {
  const flexGrow = useMemo<number>(() => (grow ? 1 : 0), []);

  return (
    <Center flexGrow={flexGrow} ref={ref} {...props}>
      {children}
    </Center>
  );
});

export default FCenter;
