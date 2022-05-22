import React from 'react';
import DraggableFlatList, {DragEndParams, RenderItemParams, ScaleDecorator} from 'react-native-draggable-flatlist';
import {Group} from '../../../models/Group';
import {Box, useTheme} from 'native-base';
import GroupListItem from './GroupListItem';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import GroupsActions from '../../../store/groups/groupsActions';

type GroupListContainerProps = {
  sorting: boolean;
};

const renderer = (sorting: boolean) => (props: RenderItemParams<Group>) =>
  (
    <ScaleDecorator activeScale={1.03}>
      <Box my={1.5}>
        <GroupListItem sorting={sorting} {...props} />
      </Box>
    </ScaleDecorator>
  );

const GroupListContainer = ({sorting}: GroupListContainerProps) => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(GroupsSelectors.groups);
  const theme = useTheme();

  const setGroups = (groups: Group[]): void => {
    dispatch(GroupsActions.setGroups(groups));
  };

  const extractKey = (group: Group): string => group.id;

  const handleDragEnd = ({data}: DragEndParams<Group>): void => setGroups(data);

  const containerStyle = {
    padding: theme.sizes['3'],
    paddingTop: theme.sizes['1.5'],
    paddingBottom: theme.sizes['1.5'],
  };

  return (
    <DraggableFlatList
      data={groups}
      onDragEnd={handleDragEnd}
      keyExtractor={extractKey}
      renderItem={renderer(sorting)}
      contentContainerStyle={containerStyle}
    />
  );
};

export default GroupListContainer;
