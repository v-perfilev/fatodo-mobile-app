import {Button, IButtonProps} from 'native-base';
import React from 'react';

type OutlinedButtonProps = IButtonProps;

const OutlinedButton = React.forwardRef((props: OutlinedButtonProps, ref: any) => {
  const {children, ...other} = props;

  return (
    <Button {...other} borderRadius={0} variant="outline" ref={ref}>
      {children}
    </Button>
  );
});

export default OutlinedButton;
