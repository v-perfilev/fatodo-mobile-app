import React from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const ArrowUpIcon = (props: IIconProps) => {
  return (
    <Icon pointerEvents="none" viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
    </Icon>
  );
};

export default ArrowUpIcon;
