import React, {useMemo} from 'react';
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

  const flexGrow = useMemo<string>(() => (grow ? '1' : '0'), []);
  const flexBasis = useMemo<number>(() => (basis ? 1 : undefined), []);

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
    <HStack flexGrow={flexGrow} flexBasis={flexBasis} space={space} ref={ref} {...otherProps}>
      {children}
    </HStack>
  );
});

export default FHStack;
