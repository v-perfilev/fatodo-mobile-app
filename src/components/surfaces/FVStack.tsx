import React, {useMemo} from 'react';
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

const FVStack = ({grow, basis, shrink, defaultSpace, smallSpace, children, ...props}: FlexVStackProps) => {
  const flexGrow = useMemo<string>(() => (grow ? '1' : '0'), []);

  const flexBasis = useMemo<number>(() => (basis ? 1 : undefined), []);

  const flexShrink = useMemo<number>(() => (shrink ? 1 : undefined), []);

  const space = useMemo<number>(() => {
    let result;
    if (defaultSpace) {
      result = DEFAULT_SPACE;
    } else if (smallSpace) {
      result = SMALL_SPACE;
    }
    return result;
  }, []);

  return (
    <VStack flexGrow={flexGrow} flexBasis={flexBasis} flexShrink={flexShrink} space={space} {...props}>
      {children}
    </VStack>
  );
};

export default FVStack;
