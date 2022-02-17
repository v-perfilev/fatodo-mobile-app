import React, {FC} from 'react';
import {useGroupListContext} from '../../../shared/contexts/listContexts/groupListContext';
import DraggableFlatList, {DragEndParams, RenderItemParams, ScaleDecorator} from 'react-native-draggable-flatlist';
import {Group} from '../../../models/Group';
import GroupListItem from './GroupListItem';

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
        <GroupListItem sorting={sorting} {...props} />
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList data={groups} onDragEnd={handleDragEnd} keyExtractor={extractKey} renderItem={renderItem} />
  );
};

export default GroupListContainer;
