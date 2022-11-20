import React, {ReactNode} from 'react';
import {Text} from 'native-base';
import FHStack from '../boxes/FHStack';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';
import PressableButton from '../controls/PressableButton';

type BoxWithIconProps = IPressableProps & {
  icon: ReactNode;
  text: string | number;
};

const BoxWithIcon = ({icon, onPress, text}: BoxWithIconProps) => {
  const content = (
    <FHStack space="1" alignItems="center">
      {icon}
      <Text fontSize="sm" color="gray.400">
        {text}
      </Text>
    </FHStack>
  );

  return onPress ? <PressableButton onPress={onPress}>{content}</PressableButton> : content;
};

export default BoxWithIcon;
