import React from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const HighPriorityIcon = (props: IIconProps) => {
  return (
    <Icon pointerEvents="none" viewBox="0 0 24 24" {...props}>
      <Path d="M2.5 14.5H6.5V20.5H2.5V14.5Z" fill="currentColor" />
      <Path d="M9.5 9.5H13.5V20.5H9.5V9.5Z" fill="currentColor" />
      <Path d="M16.5 3.5H20.5V20.5H16.5V3.5Z" fill="currentColor" />
    </Icon>
  );
};

export default HighPriorityIcon;
