import {Button, IButtonProps} from 'native-base';
import React, {MutableRefObject} from 'react';

type OutlinedButtonProps = IButtonProps;

const OutlinedButton = React.forwardRef((props: OutlinedButtonProps, ref: HTMLElement) => {
  const {children, ...other} = props;

  return (
    <Button {...other} variant="outline" ref={ref as MutableRefObject<any>} minW="90px">
      {children}
    </Button>
  );
});

export default OutlinedButton;
