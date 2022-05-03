import React from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const ArrowBackIcon = (props: IIconProps) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </Icon>
  );
};

export default ArrowBackIcon;
