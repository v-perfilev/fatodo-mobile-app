import React from 'react';
import {Icon, IIconProps} from 'native-base';
import {Path} from 'react-native-svg';

const CommentsIcon = (props: IIconProps) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 
      0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M13,17V20.08L16.08,17H21V7H7V17H13M3,15H1V3A2,2 0 
      0,1 3,1H19V3H3V15M9,9H19V11H9V9M9,13H17V15H9V13Z"
      />
    </Icon>
  );
};

export default CommentsIcon;
