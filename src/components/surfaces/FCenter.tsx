import React from 'react';
import {Center, ICenterProps} from 'native-base';

type FCenterProps = ICenterProps & {
  grow?: boolean;
};

const FCenter = ({grow, children, ...props}: FCenterProps) => (
  <Center flexGrow={grow ? '1' : '0'} {...props}>
    {children}
  </Center>
);

export default FCenter;
