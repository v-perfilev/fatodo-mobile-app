import React from 'react';
import {IconButton as NBIconButton, IIconButtonProps} from 'native-base';

type IconButtonProps = IIconButtonProps;

const IconButton = React.forwardRef(({icon, size, ...props}: IconButtonProps, ref: any) => {
  const iconElement = React.cloneElement(icon, {size: size || 'lg'});

  return <NBIconButton borderRadius="full" p="1" {...props} size={undefined} icon={iconElement} ref={ref} />;
});

export default IconButton;
