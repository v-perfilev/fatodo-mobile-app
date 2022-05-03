import {Button, IButtonProps} from 'native-base';
import React, {MutableRefObject} from 'react';

type LinkButtonProps = IButtonProps;

const LinkButton = React.forwardRef((props: LinkButtonProps, ref: HTMLElement) => {
  const {children, ...other} = props;

  return (
    <Button variant="link" {...other} _pressed={{opacity: 0.7}} ref={ref as MutableRefObject<any>}>
      {children}
    </Button>
  );
});

export default LinkButton;
