import React, {FC} from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const ArrowDownIcon: FC<IIconProps> = (props) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </Icon>
  );
};

export default ArrowDownIcon;
