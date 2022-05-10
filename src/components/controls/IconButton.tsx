import {IconButton, IIconButtonProps} from 'native-base';
import React, {MutableRefObject} from 'react';

type CustomIconButtonProps = IIconButtonProps;

const CustomIconButton = React.forwardRef((props: CustomIconButtonProps, ref: HTMLElement) => {
  const {icon, colorScheme, size, isDisabled, ...other} = props;

  const color = colorScheme + '.500';
  const bg = colorScheme + '.500:alpha.10';

  return (
    <IconButton
      {...other}
      variant="ghost"
      borderRadius="full"
      bg={bg}
      icon={icon}
      // disabled={isDisabled}
      isDisabled={isDisabled}
      colorScheme={colorScheme}
      _icon={{color, size}}
      _pressed={{opacity: 0.7}}
      ref={ref as MutableRefObject<any>}
    />
  );
});

export default CustomIconButton;
