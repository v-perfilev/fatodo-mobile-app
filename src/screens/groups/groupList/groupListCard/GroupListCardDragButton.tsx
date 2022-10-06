import React from 'react';
import ReorderIcon from '../../../../components/icons/ReorderIcon';
import IconButton from '../../../../components/controls/IconButton';

type GroupListCardDragButtonProps = {
  drag: () => void;
};

const GroupListCardDragButton = ({drag}: GroupListCardDragButtonProps) => {
  return <IconButton icon={<ReorderIcon />} onPressIn={drag} />;
};

export default GroupListCardDragButton;
