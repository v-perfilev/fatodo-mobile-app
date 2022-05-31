import React from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const ArchiveIcon = (props: IIconProps) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z"
      />
    </Icon>
  );
};

export default ArchiveIcon;
