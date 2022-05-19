import React from 'react';
import {IHStackProps} from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import {HStack} from 'native-base';

type FHStackProps = IHStackProps & {
  grow?: boolean;
  basis?: boolean;
  defaultSpace?: boolean;
};

const FHStack = ({grow, basis, defaultSpace, children, ...props}: FHStackProps) => (
  <HStack
    flexGrow={grow ? '1' : '0'}
    flexBasis={basis ? 1 : undefined}
    space={defaultSpace ? '3' : undefined}
    {...props}
  >
    {children}
  </HStack>
);

export default FHStack;
