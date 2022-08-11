import {Button, IButtonProps} from 'native-base';
import React from 'react';

type LinkButtonProps = IButtonProps;

const LinkButton = React.forwardRef((props: LinkButtonProps, ref: any) => {
  const {children, ...other} = props;

  return (
    <Button {...other} variant="link" _pressed={{opacity: 0.7}} ref={ref}>
      {children}
    </Button>
  );
});

export default LinkButton;
