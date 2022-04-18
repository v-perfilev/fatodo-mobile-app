import React from 'react';
import {Box, Center} from 'native-base';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';
import PressableButton from './PressableButton';

type RoundButtonProps = IPressableProps & {
  size?: number;
};

const RoundButton = React.forwardRef<HTMLElement, RoundButtonProps>((props, ref) => {
  const {children, size = 7, ...other} = props;

  return (
    <PressableButton {...other} ref={ref}>
      <Box width={size} height={size} rounded="full" borderWidth="1" borderColor="white">
        <Center flex="1">{children}</Center>
      </Box>
    </PressableButton>
  );
});

export default RoundButton;
