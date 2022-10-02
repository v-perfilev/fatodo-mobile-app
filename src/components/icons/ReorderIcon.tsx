import React from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const ReorderIcon = (props: IIconProps) => {
  return (
    <Icon pointerEvents="none" viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="M9,3L5,7H8V14H10V7H13M16,17V10H14V17H11L15,21L19,17H16Z" />
    </Icon>
  );
};

export default ReorderIcon;
