import {Button, IButtonProps} from 'native-base';
import React, {MutableRefObject} from 'react';

type SolidButtonProps = IButtonProps;

const SolidButton = React.forwardRef((props: SolidButtonProps, ref: HTMLElement) => {
  const {children, ...other} = props;

  return (
    <Button variant="solid" {...other} ref={ref as MutableRefObject<any>}>
      {children}
    </Button>
  );
});

export default SolidButton;
