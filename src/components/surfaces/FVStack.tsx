import React from 'react';
import {IVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import {VStack} from 'native-base';

type FlexVStackProps = IVStackProps & {
  grow?: boolean;
  defaultSpace?: boolean;
};

const FVStack = ({grow, defaultSpace, children, ...props}: FlexVStackProps) => (
  <VStack flexGrow={grow ? '1' : '0'} space={defaultSpace ? '3' : undefined} {...props}>
    {children}
  </VStack>
);

export default FVStack;
