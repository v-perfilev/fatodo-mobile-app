import {Button, IButtonProps} from 'native-base';
import React from 'react';

type GhostButtonProps = IButtonProps;

const GhostButton = React.forwardRef((props: GhostButtonProps, ref: any) => {
  const {children, ...other} = props;

  return (
    <Button {...other} variant="ghost" _pressed={{opacity: 0.7}} ref={ref}>
      {children}
    </Button>
  );
});

export default GhostButton;
