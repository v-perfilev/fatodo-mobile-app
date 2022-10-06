import React from 'react';
import IconButton from '../../../../components/controls/IconButton';
import ReorderIcon from '../../../../components/icons/ReorderIcon';

type GroupListCardDragButtonProps = {
  drag: () => void;
};

const GroupListCardDragButton = ({drag}: GroupListCardDragButtonProps) => {
  return (
    <IconButton colorScheme="primary" bgTransparency="10" size="lg" p="1" icon={<ReorderIcon />} onPressIn={drag} />
  );
};

export default GroupListCardDragButton;
