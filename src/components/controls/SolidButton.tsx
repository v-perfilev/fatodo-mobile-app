import {Button, IButtonProps} from 'native-base';
import React, {MutableRefObject} from 'react';

type SolidButtonProps = IButtonProps;

const SolidButton = React.forwardRef<HTMLElement, SolidButtonProps>((props, ref) => {
  const {children, ...other} = props;

  return (
    <Button variant="solid" {...other} ref={ref as MutableRefObject<any>}>
      {children}
    </Button>
  );
});

export default SolidButton;
