import React from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const DayIcon = (props: IIconProps) => {
  return (
    <Icon pointerEvents="none" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9
    3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"
      />
    </Icon>
  );
};

export default DayIcon;
