import React from 'react';
import {GestureResponderEvent} from 'react-native';
import CollapsedIcon from '../../../../components/icons/CollapsedIcon';
import {Group} from '../../../../models/Group';
import {useAppDispatch} from '../../../../store/store';
import IconButton from '../../../../components/controls/IconButton';
import {GroupsActions} from '../../../../store/groups/groupsActions';

type GroupListCardCollapseButtonProps = {
  group: Group;
  collapsed: boolean;
};

const GroupListCardCollapseButton = ({group, collapsed}: GroupListCardCollapseButtonProps) => {
  const dispatch = useAppDispatch();

  const setCollapsed = (groupId: string, value: boolean): void => {
    dispatch(GroupsActions.setCollapsed(groupId, value));
  };

  const handlePress = (e: GestureResponderEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setCollapsed(group.id, !collapsed);
  };

  return (
    <IconButton
      colorScheme="primary"
      size="xl"
      p="0.5"
      icon={<CollapsedIcon hidden={!collapsed} />}
      onPress={handlePress}
    />
  );
};

export default GroupListCardCollapseButton;
