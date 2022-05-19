import React from 'react';
import {IVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import {VStack} from 'native-base';

type FlexVStackProps = IVStackProps & {
  grow?: boolean;
  basis?: boolean;
  defaultSpace?: boolean;
};

const FVStack = ({grow, basis, defaultSpace, children, ...props}: FlexVStackProps) => (
  <VStack
    flexGrow={grow ? '1' : '0'}
    flexBasis={basis ? 1 : undefined}
    space={defaultSpace ? '3' : undefined}
    {...props}
  >
    {children}
  </VStack>
);

export default FVStack;
