import React from 'react';
import {DragEndParams, RenderItemParams, ScaleDecorator} from 'react-native-draggable-flatlist';
import {Group} from '../../../models/Group';
import {useTheme} from 'native-base';
import GroupListItem from './GroupListItem';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import {GroupsActions, GroupsThunks} from '../../../store/groups/groupsActions';
import {ListUtils} from '../../../shared/utils/ListUtils';
import DraggableList from '../../../components/surfaces/DraggableList';

type GroupListContainerProps = {
  sorting: boolean;
};

const GroupListContainer = ({sorting}: GroupListContainerProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const groups = useAppSelector(GroupsSelectors.groups);

  const refresh = (): Promise<any> => {
    return dispatch(GroupsThunks.refreshGroups());
  };

  const setGroups = (groups: Group[]): void => {
    dispatch(GroupsActions.setGroups(groups));
  };

  const extractKey = (group: Group): string => group.id;
  const renderItem = (props: RenderItemParams<Group>) => {
    return (
      <ScaleDecorator activeScale={1.03}>
        <GroupListItem sorting={sorting} style={ListUtils.itemStyle(theme)} {...props} />
      </ScaleDecorator>
    );
  };
  const handleDragEnd = ({data}: DragEndParams<Group>): void => setGroups(data);

  return (
    <DraggableList
      data={groups}
      renderItem={renderItem}
      keyExtractor={extractKey}
      handleDragEnd={handleDragEnd}
      refresh={!sorting && refresh}
    />
  );
};

export default GroupListContainer;
