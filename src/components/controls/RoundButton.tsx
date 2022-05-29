import React, {MutableRefObject} from 'react';
import {Button, IButtonProps} from 'native-base';
import FCenter from '../boxes/FCenter';

type RoundButtonProps = IButtonProps & {
  size?: number;
};

const RoundButton = React.forwardRef((props: RoundButtonProps, ref: HTMLElement) => {
  const {children, size = 7, ...other} = props;

  return (
    <Button
      width={size}
      height={size}
      p="0"
      variant="outline"
      rounded="full"
      ref={ref as MutableRefObject<any>}
      {...other}
    >
      <FCenter>{children}</FCenter>
    </Button>
  );
});

export default RoundButton;
