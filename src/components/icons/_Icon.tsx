import React, {FC} from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const _Icon: FC<IIconProps> = (props) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="" />
    </Icon>
  );
};

export default _Icon;
