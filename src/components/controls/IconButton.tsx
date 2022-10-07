import React from 'react';
import {IconButton as NBIconButton, IIconButtonProps} from 'native-base';

type IconButtonProps = IIconButtonProps;

const IconButton = React.forwardRef((props: IconButtonProps, ref: any) => {
  const icon = React.cloneElement(props.icon, {size: props.size || 'lg'});

  return <NBIconButton borderRadius="full" p="1" {...props} size={undefined} icon={icon} ref={ref} />;
});

export default IconButton;
