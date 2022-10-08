import React, {memo, ReactElement} from 'react';
import {Avatar} from 'native-base';
import {ISizes} from 'native-base/lib/typescript/theme/base/sizes';
import FCenter from '../boxes/FCenter';

type IconPicProps = {
  icon: ReactElement;
  size: ISizes;
  border?: number;
  invertedBorder?: boolean;
};

const IconPic = ({icon, size, border = 1, invertedBorder}: IconPicProps) => {
  const borderColor = invertedBorder ? 'white' : 'primary.500';

  const iconElement = React.cloneElement(icon, {size: '70%', color: 'primary.500'});

  return (
    <Avatar size={size} borderWidth={border} borderColor={borderColor} overflow="hidden">
      <FCenter w="100%" h="100" backgroundColor={'white'}>
        {iconElement}
      </FCenter>
    </Avatar>
  );
};

export default memo(IconPic);
