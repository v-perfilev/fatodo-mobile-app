import React, {FC} from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const ArrowBackIcon: FC<IIconProps> = (props) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z" />
    </Icon>
  );
};

export default ArrowBackIcon;
