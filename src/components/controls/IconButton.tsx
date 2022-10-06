import React from 'react';
import {IconButton as NBIconButton, IIconButtonProps} from 'native-base';

type IconButtonProps = IIconButtonProps;

const IconButton = React.forwardRef((props: IconButtonProps, ref: any) => {
  let additionalProps = {};
  if (props.colorScheme === 'white' && props.variant === 'solid') {
    additionalProps = {
      bg: 'white:alpha.20',
      _icon: {color: 'white'},
      _pressed: {bg: 'white:alpha.20'},
    };
  } else if (props.colorScheme === 'white') {
    additionalProps = {
      _icon: {color: 'white'},
      _pressed: {bg: 'white:alpha.10'},
    };
  }

  const icon = React.cloneElement(props.icon, {size: props.size || 'lg'});

  return (
    <NBIconButton borderRadius="full" p="1" {...additionalProps} {...props} size={undefined} icon={icon} ref={ref} />
  );
});

export default IconButton;
