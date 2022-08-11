import React from 'react';
import {Button, IButtonProps} from 'native-base';
import FCenter from '../boxes/FCenter';

type RoundButtonProps = IButtonProps & {
  size?: number;
};

const RoundButton = React.forwardRef((props: RoundButtonProps, ref: any) => {
  const {children, size = 7, ...other} = props;

  return (
    <Button width={size} height={size} p="0" variant="outline" rounded="full" ref={ref} {...other}>
      <FCenter>{children}</FCenter>
    </Button>
  );
});

export default RoundButton;
