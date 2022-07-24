import React, {memo} from 'react';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import CornerButton from './CornerButton';

type ScrollButtonProps = {
  show: boolean;
  scrollDown: () => void;
};

const ScrollCornerButton = ({show, scrollDown}: ScrollButtonProps) => {
  return show ? <CornerButton icon={<ArrowDownIcon />} onPress={scrollDown} /> : null;
};

export default memo(ScrollCornerButton);
