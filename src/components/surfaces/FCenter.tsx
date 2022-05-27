import React, {useMemo} from 'react';
import {Center, ICenterProps} from 'native-base';

type FCenterProps = ICenterProps & {
  grow?: boolean;
};

const FCenter = ({grow, children, ...props}: FCenterProps) => {
  const flexGrow = useMemo<string>(() => (grow ? '1' : '0'), []);

  return (
    <Center flexGrow={flexGrow} {...props}>
      {children}
    </Center>
  );
};

export default FCenter;
