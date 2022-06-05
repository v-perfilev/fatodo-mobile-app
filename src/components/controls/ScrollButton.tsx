import React, {memo} from 'react';
import IconButton from './IconButton';
import ArrowDownIcon from '../icons/ArrowDownIcon';

type ScrollButtonProps = {
  show: boolean;
  scrollDown: () => void;
};

const ScrollButton = ({show, scrollDown}: ScrollButtonProps) => {
  const button = (
    <IconButton
      zIndex="100"
      position="absolute"
      bottom="3"
      right="3"
      colorScheme="white"
      bgColorScheme="primary"
      bgTransparency="90"
      icon={<ArrowDownIcon />}
      onPress={scrollDown}
    />
  );

  return show ? button : null;
};

export default memo(ScrollButton);
