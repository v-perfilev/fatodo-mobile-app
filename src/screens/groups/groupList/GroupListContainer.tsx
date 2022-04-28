import React, {FC} from 'react';
import {useGroupListContext} from '../../../shared/contexts/listContexts/groupListContext';
import DraggableFlatList, {DragEndParams, RenderItemParams, ScaleDecorator} from 'react-native-draggable-flatlist';
import {Group} from '../../../models/Group';
import {Box, useTheme} from 'native-base';
import GroupListItem from './GroupListItem';

type GroupListContainerProps = {
  sorting: boolean;
};

const renderer = (sorting: boolean) => (props: RenderItemParams<Group>) =>
  (
    <ScaleDecorator activeScale={1.03}>
      <Box px="2" pb="2">
        <GroupListItem sorting={sorting} {...props} />
      </Box>
    </ScaleDecorator>
  );

const GroupListContainer: FC<GroupListContainerProps> = ({sorting}) => {
  const {groups, setGroups} = useGroupListContext();
  const theme = useTheme();

  const extractKey = (group: Group): string => group.id;

  const handleDragEnd = ({data}: DragEndParams<Group>): void => setGroups(data);

  const containerStyle = {
    paddingTop: theme.sizes['3'],
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
