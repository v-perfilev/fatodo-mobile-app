import React from 'react';
import IconButton from '../../../components/controls/IconButton';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';

type ChatViewScrollButtonProps = {
  scrollDown: () => void;
};

const ChatViewScrollButton = ({scrollDown}: ChatViewScrollButtonProps) => {
  return (
    <IconButton
      position="absolute"
      bottom="3"
      right="3"
      size="lg"
      opaque
      icon={<ArrowDownIcon />}
      onPress={scrollDown}
    />
  );
};

export default ChatViewScrollButton;
