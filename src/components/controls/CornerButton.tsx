import React, {ReactElement} from 'react';
import IconButton from './IconButton';
import {IButtonProps} from 'native-base';

type CornerButtonProps = IButtonProps & {
  icon: ReactElement;
  onPress: () => void;
  show?: boolean;
};

const CornerButton = ({icon, onPress, show = true, size = 'lg', p = 3, ...props}: CornerButtonProps) => {
  return show ? (
    <IconButton
      zIndex="100"
      position="absolute"
      bottom="3"
      right="3"
      colorScheme="white"
      bgColorScheme="primary"
      bgTransparency="90"
      icon={icon}
      onPress={onPress}
      size={size}
      p={p}
      {...props}
    />
  ) : null;
};

export default CornerButton;
