import React from 'react';
import {Pressable} from 'native-base';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';

type PressableButtonProps = IPressableProps;

const PressableButton = React.forwardRef((props: PressableButtonProps, ref: any) => {
  const {children, ...other} = props;
  return (
    <Pressable _disabled={{opacity: 0.4}} _pressed={{opacity: 0.8}} {...other} ref={ref}>
      {children}
    </Pressable>
  );
});

export default PressableButton;
