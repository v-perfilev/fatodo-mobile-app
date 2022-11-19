import React from 'react';
import ReorderIcon from '../../../../components/icons/ReorderIcon';
import IconButton from '../../../../components/controls/IconButton';
import {IIconButtonProps} from 'native-base';

type GroupListCardDragButtonProps = IIconButtonProps & {
  drag: () => void;
};

const GroupListCardDragButton = ({drag, ...props}: GroupListCardDragButtonProps) => {
  return <IconButton icon={<ReorderIcon />} onPressIn={drag} {...props} />;
};

export default GroupListCardDragButton;
