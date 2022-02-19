import React, {FC} from 'react';
import {Box, Center, Pressable} from 'native-base';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';

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

  return withoutPressable ? (
    box
  ) : (
    <Pressable _pressed={{opacity: 0.7}} {...props}>
      {box}
    </Pressable>
  );
};

export default RoundButton;
