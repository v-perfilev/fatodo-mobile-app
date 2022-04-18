import {IconButton, IIconButtonProps} from 'native-base';
import React from 'react';

type CustomIconButtonProps = IIconButtonProps;

const CustomIconButton = React.forwardRef<HTMLElement, CustomIconButtonProps>((props, ref) => {
  const {icon, color, size, ...other} = props;

  return (
    <IconButton
      variant="ghost"
      borderRadius="full"
      bg={color + ':alpha.10'}
      icon={icon}
      _icon={{color: color, size: size}}
      _pressed={{opacity: 0.7}}
      {...other}
      ref={ref}
    />
  );
});

export default CustomIconButton;
