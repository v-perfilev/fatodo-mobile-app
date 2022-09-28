import React, {ReactNode} from 'react';
import {Text} from 'native-base';
import FHStack from '../boxes/FHStack';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';
import PressableButton from '../controls/PressableButton';

type BoxWithIconProps = IPressableProps & {
  icon: ReactNode;
};

const BoxWithIcon = ({icon, onPress, children}: BoxWithIconProps) => {
  const content = (
    <FHStack smallSpace alignItems="center">
      {icon}
      <Text>{children}</Text>
    </FHStack>
  );

  return onPress ? <PressableButton onPress={onPress}>{content}</PressableButton> : content;
};

export default BoxWithIcon;
