import React, {ReactNode} from 'react';
import {IBoxProps, Text} from 'native-base';
import FHStack from '../boxes/FHStack';

type BoxWithIconProps = IBoxProps & {
  icon: ReactNode;
};

const BoxWithIcon = ({icon, children}: BoxWithIconProps) => {
  return (
    <FHStack smallSpace alignItems="center">
      {icon}
      <Text>{children}</Text>
    </FHStack>
  );
};

export default BoxWithIcon;
