import React, {ReactNode} from 'react';
import {IBoxProps, Text} from 'native-base';
import FHStack from './FHStack';

type BoxWithIconProps = IBoxProps & {
  icon: ReactNode;
};

const BoxWithIcon = ({icon, children}: BoxWithIconProps) => {
  return (
    <FHStack space="1" alignItems="center">
      {icon}
      <Text>{children}</Text>
    </FHStack>
  );
};

export default BoxWithIcon;
