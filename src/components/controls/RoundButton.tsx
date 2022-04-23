import React, {MutableRefObject} from 'react';
import {Button, IButtonProps} from 'native-base';

type RoundButtonProps = IButtonProps & {
  size?: number;
};

const RoundButton = React.forwardRef<HTMLElement, RoundButtonProps>((props, ref) => {
  const {children, size = 7, ...other} = props;

  return (
    <Button width={size} height={size} variant="outline" rounded="full" {...other} ref={ref as MutableRefObject<any>}>
      {children}
    </Button>
  );
});

export default RoundButton;
