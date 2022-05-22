import React from 'react';
import {GestureResponderEvent} from 'react-native';
import RoundButton from '../../../../components/controls/RoundButton';
import CollapsedIcon from '../../../../components/icons/CollapsedIcon';
import {Group} from '../../../../models/Group';
import {useAppDispatch} from '../../../../store/store';
import GroupsActions from '../../../../store/groups/groupsActions';

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
    <RoundButton
      borderColor="white"
      _pressed={{bg: 'white:alpha.20'}}
      leftIcon={<CollapsedIcon visible={!collapsed} color="white" size="sm" />}
      onPress={handlePress}
    />
  );
};

export default GroupListCardCollapseButton;
