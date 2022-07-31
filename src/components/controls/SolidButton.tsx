import {Button, IButtonProps} from 'native-base';
import React, {MutableRefObject} from 'react';

type SolidButtonProps = IButtonProps;

const SolidButton = React.forwardRef((props: SolidButtonProps, ref: HTMLElement) => {
  const {children, ...other} = props;

  return (
    <Button {...other} variant="solid" ref={ref as MutableRefObject<any>} minW="90px">
      {children}
    </Button>
  );
});

export default SolidButton;
