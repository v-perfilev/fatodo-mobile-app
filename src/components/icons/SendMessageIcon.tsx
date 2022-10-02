import React from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const SendMessageIcon = (props: IIconProps) => {
  return (
    <Icon pointerEvents="none" viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
    </Icon>
  );
};

export default SendMessageIcon;
