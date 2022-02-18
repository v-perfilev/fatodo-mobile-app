import React, {FC} from 'react';
import {useGroupListContext} from '../../../shared/contexts/listContexts/groupListContext';
import DraggableFlatList, {DragEndParams, RenderItemParams, ScaleDecorator} from 'react-native-draggable-flatlist';
import {Group} from '../../../models/Group';
import GroupListItem from './GroupListItem';
import {Box, useTheme} from 'native-base';

type GroupListContainerProps = {
  sorting: boolean;
};

const GroupListContainer: FC<GroupListContainerProps> = ({sorting}) => {
  const {groups, setGroups} = useGroupListContext();
  const theme = useTheme();

  const extractKey = (group: Group): string => group.id;

  const handleDragEnd = ({data}: DragEndParams<Group>): void => setGroups(data);

  const renderItem = (props: RenderItemParams<Group>) => {
    return (
      <ScaleDecorator>
        <Box mx="2" mb="2">
          <GroupListItem sorting={sorting} {...props} />
        </Box>
      </ScaleDecorator>
    );
  };

  const containerStyle = {
    paddingTop: theme.sizes['3'],
  };

  return (
    <DraggableFlatList
      data={groups}
      onDragEnd={handleDragEnd}
      keyExtractor={extractKey}
      renderItem={renderItem}
      contentContainerStyle={containerStyle}
    />
  );
};

export default GroupListContainer;
