import React from 'react';
import {GestureResponderEvent} from 'react-native';
import CollapsedIcon from '../../../../components/icons/CollapsedIcon';
import {Group} from '../../../../models/Group';
import {useAppDispatch} from '../../../../store/store';
import {GroupsActions} from '../../../../store/groups/groupsActions';
import IconButton from '../../../../components/controls/IconButton';
import {IIconButtonProps} from 'native-base';

type GroupListCardCollapseButtonProps = IIconButtonProps & {
  group: Group;
  collapsed: boolean;
};

const GroupListCardCollapseButton = ({group, collapsed, ...props}: GroupListCardCollapseButtonProps) => {
  const dispatch = useAppDispatch();

  const setCollapsed = (groupId: string, value: boolean): void => {
    dispatch(GroupsActions.setCollapsed(groupId, value));
  };

  const handlePress = (e: GestureResponderEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setCollapsed(group.id, !collapsed);
  };

  return <IconButton size="xl" icon={<CollapsedIcon collapsed={!collapsed} />} onPress={handlePress} {...props} />;
};

export default GroupListCardCollapseButton;
