import React from 'react';
import {Pressable} from 'native-base';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';

type PressableButtonProps = IPressableProps;

const PressableButton = React.forwardRef<HTMLElement, PressableButtonProps>((props, ref) => {
  const {children, ...other} = props;
  return (
    <Pressable _pressed={{opacity: 0.7}} {...other} ref={ref}>
      {children}
    </Pressable>
  );
});

export default PressableButton;
