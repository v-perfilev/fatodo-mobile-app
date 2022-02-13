import {Button, IButtonProps} from 'native-base';
import React, {FC} from 'react';

type SolidButtonProps = IButtonProps;

const SolidButton: FC<SolidButtonProps> = ({children, ...props}) => {
  return (
    <Button variant="solid" {...props}>
      {children}
    </Button>
  );
};

export default SolidButton;
