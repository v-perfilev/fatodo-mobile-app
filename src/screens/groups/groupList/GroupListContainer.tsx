import React from 'react';
import DraggableFlatList, {DragEndParams, RenderItemParams, ScaleDecorator} from 'react-native-draggable-flatlist';
import {Group} from '../../../models/Group';
import {Box, Theme, useTheme} from 'native-base';
import GroupListItem from './GroupListItem';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import GroupsActions from '../../../store/groups/groupsActions';
import {StyleProp, ViewStyle} from 'react-native';
import {DEFAULT_SPACE, HALF_DEFAULT_SPACE} from '../../../constants';

const containerStyle = (theme: Theme): StyleProp<ViewStyle> => ({
  padding: theme.sizes[DEFAULT_SPACE],
  paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
  paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
});

type GroupListContainerProps = {
  sorting: boolean;
};

const renderer = (sorting: boolean) => (props: RenderItemParams<Group>) =>
  (
    <ScaleDecorator activeScale={1.03}>
      <Box my="1.5">
        <GroupListItem sorting={sorting} {...props} />
      </Box>
    </ScaleDecorator>
  );

const GroupListContainer = ({sorting}: GroupListContainerProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const groups = useAppSelector(GroupsSelectors.groups);

  const setGroups = (groups: Group[]): void => {
    dispatch(GroupsActions.setGroups(groups));
  };

  const extractKey = (group: Group): string => group.id;

  const handleDragEnd = ({data}: DragEndParams<Group>): void => setGroups(data);

  return (
    <DraggableFlatList
      data={groups}
      onDragEnd={handleDragEnd}
      keyExtractor={extractKey}
      renderItem={renderer(sorting)}
      contentContainerStyle={containerStyle(theme)}
    />
  );
};

export default GroupListContainer;
