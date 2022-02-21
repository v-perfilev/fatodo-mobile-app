import React, {FC} from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const ReorderIcon: FC<IIconProps> = (props) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="M10,8H6L12,2L18,8H14V16H18L12,22L6,16H10V8Z" />
    </Icon>
  );
};

export default ReorderIcon;
