import React, {memo} from 'react';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import IconButton from '../../../components/controls/IconButton';

type ChatViewScrollButtonProps = {
  show: boolean;
  scrollDown: () => void;
};

const ChatViewScrollButton = ({show, scrollDown}: ChatViewScrollButtonProps) => {
  const button = (
    <IconButton zIndex="100" position="absolute" bottom="3" right="3" icon={<ArrowDownIcon />} onPress={scrollDown} />
  );

  return show ? button : null;
};

export default memo(ChatViewScrollButton);
