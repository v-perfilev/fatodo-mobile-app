import {Button, IButtonProps} from 'native-base';
import React, {MutableRefObject} from 'react';

type OutlinedButtonProps = IButtonProps;

const OutlinedButton = React.forwardRef((props: OutlinedButtonProps, ref: HTMLElement) => {
  const {children, ...other} = props;

  return (
    <Button variant="outline" {...other} ref={ref as MutableRefObject<any>}>
      {children}
    </Button>
  );
});

export default OutlinedButton;
