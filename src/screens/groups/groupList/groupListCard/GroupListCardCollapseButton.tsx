import React from 'react';
import {GestureResponderEvent} from 'react-native';
import CollapsedIcon from '../../../../components/icons/CollapsedIcon';
import {Group} from '../../../../models/Group';
import {useAppDispatch} from '../../../../store/store';
import {GroupsActions} from '../../../../store/groups/groupsActions';
import IconButton from '../../../../components/controls/IconButton';

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

  return <IconButton size="xl" icon={<CollapsedIcon hidden={!collapsed} />} onPress={handlePress} />;
};

export default GroupListCardCollapseButton;
