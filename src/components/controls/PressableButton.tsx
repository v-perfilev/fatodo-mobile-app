import React from 'react';
import {Pressable} from 'native-base';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';

type PressableButtonProps = IPressableProps;

const PressableButton = React.forwardRef((props: PressableButtonProps, ref: any) => {
  const {children, ...other} = props;
  return (
    <Pressable {...other} _disabled={{opacity: 0.4}} _pressed={{opacity: 0.7}} ref={ref}>
      {children}
    </Pressable>
  );
});

export default PressableButton;
