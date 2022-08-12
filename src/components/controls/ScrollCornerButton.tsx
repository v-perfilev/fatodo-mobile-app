import React, {memo} from 'react';
import CornerButton from './CornerButton';
import ArrowUpIcon from '../icons/ArrowUpIcon';

type ScrollButtonProps = {
  show: boolean;
  scrollDown: () => void;
};

const ScrollCornerButton = ({show, scrollDown}: ScrollButtonProps) => {
  return show ? <CornerButton icon={<ArrowUpIcon />} onPress={scrollDown} /> : null;
};

export default memo(ScrollCornerButton);
