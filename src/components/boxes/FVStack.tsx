import React from 'react';
import {IVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import {VStack} from 'native-base';

type FlexVStackProps = IVStackProps & {
  grow?: boolean;
  basis?: boolean;
  shrink?: boolean;
};

const FVStack = React.forwardRef((props: FlexVStackProps, ref: any) => {
  const {grow, basis, shrink, children, ...otherProps} = props;

  const flex = grow ? 1 : undefined;
  const flexGrow = grow ? 1 : 0;
  const flexBasis = basis ? 1 : undefined;
  const flexShrink = shrink ? 1 : undefined;

  return (
    <VStack flex={flex} flexGrow={flexGrow} flexBasis={flexBasis} flexShrink={flexShrink} ref={ref} {...otherProps}>
      {children}
    </VStack>
  );
});

export default FVStack;
