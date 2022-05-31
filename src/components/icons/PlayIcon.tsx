import React from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const PlayIcon = (props: IIconProps) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
    </Icon>
  );
};

export default PlayIcon;
