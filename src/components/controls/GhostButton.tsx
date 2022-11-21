import {Button, IButtonProps} from 'native-base';
import React from 'react';

type GhostButtonProps = IButtonProps;

const GhostButton = React.forwardRef((props: GhostButtonProps, ref: any) => {
  const {children, ...other} = props;

  return (
    <Button variant="ghost" size="lg" px="3" py="1" _pressed={{opacity: 0.7}} {...other} ref={ref}>
      {children}
    </Button>
  );
});

export default GhostButton;
