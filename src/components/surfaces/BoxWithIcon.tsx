import React, {ReactNode} from 'react';
import {HStack, IBoxProps, Text} from 'native-base';

type BoxWithIconProps = IBoxProps & {
  icon: ReactNode;
};

const BoxWithIcon = ({icon, children}: BoxWithIconProps) => {
  return (
    <HStack alignItems="center">
      {icon}
      <Text ml="1">{children}</Text>
    </HStack>
  );
};

export default BoxWithIcon;
