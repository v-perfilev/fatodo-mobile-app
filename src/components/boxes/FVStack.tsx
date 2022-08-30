import React from 'react';
import {IVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import {VStack} from 'native-base';
import {DEFAULT_SPACE, SMALL_SPACE} from '../../constants';

type FlexVStackProps = IVStackProps & {
  grow?: boolean;
  basis?: boolean;
  shrink?: boolean;
  defaultSpace?: boolean;
  smallSpace?: boolean;
};

const FVStack = React.forwardRef((props: FlexVStackProps, ref: any) => {
  const {grow, basis, shrink, defaultSpace, smallSpace, children, ...otherProps} = props;

  const flexGrow = grow ? 1 : 0;
  const flexBasis = basis ? 1 : undefined;
  const flexShrink = shrink ? 1 : undefined;
  const space = defaultSpace ? DEFAULT_SPACE : smallSpace ? SMALL_SPACE : undefined;

  return (
    <VStack flexGrow={flexGrow} flexBasis={flexBasis} flexShrink={flexShrink} space={space} ref={ref} {...otherProps}>
      {children}
    </VStack>
  );
});

export default FVStack;
