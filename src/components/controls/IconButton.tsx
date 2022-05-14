import {IconButton as NBIconButton, IIconButtonProps} from 'native-base';
import React, {MutableRefObject} from 'react';

type IconButtonProps = IIconButtonProps & {
  whiteIcon?: boolean;
};

const IconButton = React.forwardRef((props: IconButtonProps, ref: HTMLElement) => {
  const {icon, colorScheme = 'primary', size = 'sm', isDisabled, whiteIcon, ...other} = props;

  const color = colorScheme + '.500';
  const bg = colorScheme + '.500:alpha.10';

  const iconElement = whiteIcon ? React.cloneElement(icon, {color: 'white'}) : icon;

  return (
    <NBIconButton
      variant="ghost"
      borderRadius="full"
      bg={bg}
      icon={iconElement}
      disabled={isDisabled}
      isDisabled={isDisabled}
      colorScheme={colorScheme}
      _icon={{color, size}}
      _pressed={{opacity: 0.7}}
      ref={ref as MutableRefObject<any>}
      {...other}
    />
  );
});

export default IconButton;
