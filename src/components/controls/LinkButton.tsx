import {Button, IButtonProps} from 'native-base';
import React from 'react';

type LinkButtonProps = IButtonProps;

const LinkButton = React.forwardRef((props: LinkButtonProps, ref: any) => {
  const {children, ...other} = props;

  return (
    <Button variant="link" size="lg" px="3" py="1" _pressed={{opacity: 0.7}} {...other} ref={ref}>
      {children}
    </Button>
  );
});

export default LinkButton;
