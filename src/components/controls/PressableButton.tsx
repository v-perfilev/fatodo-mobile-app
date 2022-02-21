import React, {FC} from 'react';
import {Pressable} from 'native-base';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';

type IconButtonProps = IPressableProps;

const PressableButton: FC<IconButtonProps> = ({children, ...props}) => {
  return (
    <Pressable _pressed={{opacity: 0.7}} {...props}>
      {children}
    </Pressable>
  );
};

export default PressableButton;
