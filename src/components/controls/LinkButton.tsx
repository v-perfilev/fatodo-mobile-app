import {Button, IButtonProps} from 'native-base';
import React, {FC} from 'react';

type LinkButtonProps = IButtonProps;

const LinkButton: FC<LinkButtonProps> = ({children, ...props}) => {
  return (
    <Button variant="link" {...props}>
      {children}
    </Button>
  );
};

export default LinkButton;
