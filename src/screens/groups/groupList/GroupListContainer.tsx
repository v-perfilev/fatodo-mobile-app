import React from 'react';
import DraggableFlatList, {DragEndParams, RenderItemParams, ScaleDecorator} from 'react-native-draggable-flatlist';
import {Group} from '../../../models/Group';
import {useTheme} from 'native-base';
import GroupListItem from './GroupListItem';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import {GroupsActions} from '../../../store/groups/groupsActions';
import {ListUtils} from '../../../shared/utils/ListUtils';

type GroupListContainerProps = {
  sorting: boolean;
};

const GroupListContainer = ({sorting}: GroupListContainerProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const groups = useAppSelector(GroupsSelectors.groups);

  const setGroups = (groups: Group[]): void => {
    dispatch(GroupsActions.setGroups(groups));
  };

  const handleDragEnd = ({data}: DragEndParams<Group>): void => setGroups(data);
  const extractKey = (group: Group): string => group.id;
  const renderItem = (props: RenderItemParams<Group>) => {
    return (
      <ScaleDecorator activeScale={1.03}>
        <GroupListItem sorting={sorting} {...props} style={ListUtils.itemStyle(theme)} />
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={groups}
      onDragEnd={handleDragEnd}
      keyExtractor={extractKey}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={ListUtils.containerStyle(theme)}
    />
  );
};

export default GroupListContainer;
