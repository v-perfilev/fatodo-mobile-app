import React from 'react';
import {IHStackProps} from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import {HStack} from 'native-base';
import {DEFAULT_SPACE, SMALL_SPACE} from '../../constants';

type FHStackProps = IHStackProps & {
  grow?: boolean;
  basis?: boolean;
  defaultSpace?: boolean;
  smallSpace?: boolean;
};

const FHStack = React.forwardRef((props: FHStackProps, ref: any) => {
  const {grow, basis, defaultSpace, smallSpace, children, ...otherProps} = props;

  const flex = grow ? 1 : undefined;
  const flexGrow = grow ? 1 : 0;
  const flexBasis = basis ? 1 : undefined;
  const space = defaultSpace ? DEFAULT_SPACE : smallSpace ? SMALL_SPACE : undefined;

  return (
    <HStack flex={flex} flexGrow={flexGrow} flexBasis={flexBasis} space={space} ref={ref} {...otherProps}>
      {children}
    </HStack>
  );
});

export default FHStack;
