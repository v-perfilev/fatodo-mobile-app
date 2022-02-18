import React, {FC} from 'react';
import {useGroupListContext} from '../../../shared/contexts/listContexts/groupListContext';
import DraggableFlatList, {DragEndParams, RenderItemParams, ScaleDecorator} from 'react-native-draggable-flatlist';
import {Group} from '../../../models/Group';
import GroupListItem from './GroupListItem';
import {Box} from 'native-base';

type GroupListContainerProps = {
  sorting: boolean;
};

const GroupListContainer: FC<GroupListContainerProps> = ({sorting}) => {
  const {groups, setGroups} = useGroupListContext();

  const extractKey = (group: Group): string => group.id;

  const handleDragEnd = ({data}: DragEndParams<Group>): void => setGroups(data);

  const renderItem = (props: RenderItemParams<Group>) => {
    return (
      <ScaleDecorator>
        <Box px="2" py="1">
          <GroupListItem sorting={sorting} {...props} />
        </Box>
      </ScaleDecorator>
    );
  };

  return (
    <Box pt="2">
      <DraggableFlatList data={groups} onDragEnd={handleDragEnd} keyExtractor={extractKey} renderItem={renderItem} />
    </Box>
  );
};

export default GroupListContainer;
