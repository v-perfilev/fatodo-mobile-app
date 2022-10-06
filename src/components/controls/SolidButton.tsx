import {Button, IButtonProps} from 'native-base';
import React from 'react';

type SolidButtonProps = IButtonProps;

const SolidButton = React.forwardRef((props: SolidButtonProps, ref: any) => {
  const {children, ...other} = props;

  return (
    <Button {...other} borderRadius="xl" variant="solid" ref={ref}>
      {children}
    </Button>
  );
});

export default SolidButton;
