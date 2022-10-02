import React from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const NoteIcon = (props: IIconProps) => {
  return (
    <Icon pointerEvents="none" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M14,10V4.5L19.5,10M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V9L15,3H5Z"
      />
    </Icon>
  );
};

export default NoteIcon;
