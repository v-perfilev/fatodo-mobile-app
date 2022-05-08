import {Button, IButtonProps} from 'native-base';
import React, {MutableRefObject} from 'react';

type GhostButtonProps = IButtonProps;

const GhostButton = React.forwardRef((props: GhostButtonProps, ref: HTMLElement) => {
  const {children, ...other} = props;

  return (
    <Button {...other} variant="ghost" _pressed={{opacity: 0.7}} ref={ref as MutableRefObject<any>}>
      {children}
    </Button>
  );
});

export default GhostButton;
