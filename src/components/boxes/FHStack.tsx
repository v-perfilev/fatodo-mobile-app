import React from 'react';
import {IHStackProps} from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import {HStack} from 'native-base';

type FHStackProps = IHStackProps & {
  grow?: boolean;
  basis?: boolean;
};

const FHStack = React.forwardRef((props: FHStackProps, ref: any) => {
  const {grow, basis, children, ...otherProps} = props;

  const flex = grow ? 1 : undefined;
  const flexGrow = grow ? 1 : 0;
  const flexBasis = basis ? 1 : undefined;

  return (
    <HStack flex={flex} flexGrow={flexGrow} flexBasis={flexBasis} ref={ref} {...otherProps}>
      {children}
    </HStack>
  );
});

export default FHStack;
