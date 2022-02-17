import React, {FC, useEffect} from 'react';
import {Group} from '../../../models/Group';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import withUserList from '../../../shared/hocs/withLists/withUserList';
import withItemList from '../../../shared/hocs/withLists/withItemList';
import {flowRight} from 'lodash';
import withGroupView from '../../../shared/hocs/withViews/withGroupView';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import GroupListCard from './groupListCard/GroupListCard';
import {Pressable} from 'native-base';

type GroupListItemProps = RenderItemParams<Group> & {
  sorting: boolean;
};

const GroupListItem: FC<GroupListItemProps> = ({item, drag, isActive, sorting}) => {
  const {group, setGroup} = useGroupViewContext();

  useEffect(() => {
    setGroup(item);
  }, [item]);

  return group ? (
    <Pressable onLongPress={drag} bg={isActive ? 'red.500' : 'black'}>
      <GroupListCard sorting={sorting} drag={drag} />
    </Pressable>
  ) : null;
};

export default flowRight([withGroupView, withItemList, withUserList])(GroupListItem);
