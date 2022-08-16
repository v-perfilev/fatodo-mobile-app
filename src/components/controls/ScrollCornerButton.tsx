import React, {memo, useState} from 'react';
import CornerButton from './CornerButton';
import ArrowUpIcon from '../icons/ArrowUpIcon';
import {Animated} from 'react-native';

type ScrollButtonProps = {
  scrollY: Animated.Value;
  scroll: () => void;
};

const ScrollCornerButton = ({scrollY, scroll}: ScrollButtonProps) => {
  const [show, setShow] = useState<boolean>(false);

  scrollY.addListener(({value}) => setShow(value > 0));

  return show ? <CornerButton icon={<ArrowUpIcon />} onPress={scroll} /> : null;
};

export default memo(ScrollCornerButton);
