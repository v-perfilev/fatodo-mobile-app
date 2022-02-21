import React, {FC} from 'react';
import {Box, Center} from 'native-base';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';
import PressableButton from './PressableButton';

type RoundButtonProps = IPressableProps & {
  size?: number;
  withoutPressable?: boolean;
};

const RoundButton: FC<RoundButtonProps> = ({children, size = 7, withoutPressable, ...props}) => {
  const box = (
    <Box width={size} height={size} rounded="full" borderWidth="1" borderColor="white">
      <Center flex="1">{children}</Center>
    </Box>
  );

  return withoutPressable ? box : <PressableButton {...props}>{box}</PressableButton>;
};

export default RoundButton;
