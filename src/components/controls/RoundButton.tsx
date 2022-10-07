import React from 'react';
import {Button, IButtonProps} from 'native-base';

type RoundButtonProps = IButtonProps & {
  active?: boolean;
  size?: number;
};

const RoundButton = React.forwardRef((props: RoundButtonProps, ref: any) => {
  const {children, active, size = 7, ...other} = props;

  return (
    <Button width={size} height={size} p="0" variant={active ? 'solid' : 'outline'} rounded="full" ref={ref} {...other}>
      {children}
    </Button>
  );
});

export default RoundButton;
