import React, {FC, ReactNode} from 'react';
import {HStack, IBoxProps, Text} from 'native-base';

type BoxWithIconProps = IBoxProps & {
  icon: ReactNode;
};

const BoxWithIcon: FC<BoxWithIconProps> = ({icon, children}) => {
  return (
    <HStack alignItems="center">
      {icon}
      <Text ml="1">{children}</Text>
    </HStack>
  );
};

export default BoxWithIcon;
