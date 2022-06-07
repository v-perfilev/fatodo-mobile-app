import React, {ReactElement} from 'react';
import IconButton from './IconButton';
import {IButtonProps} from 'native-base';

type CornerButtonProps = IButtonProps & {
  icon: ReactElement;
  onPress: () => void;
};

const CornerButton = ({icon, onPress, ...props}: CornerButtonProps) => (
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
    {...props}
  />
);

export default CornerButton;
