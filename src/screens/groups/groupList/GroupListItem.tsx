import React, {FC, useEffect} from 'react';
import {Group} from '../../../models/Group';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import withUserList from '../../../shared/hocs/withLists/withUserList';
import withItemList from '../../../shared/hocs/withLists/withItemList';
import {flowRight} from 'lodash';
import withGroupView from '../../../shared/hocs/withViews/withGroupView';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import GroupListCard from './groupListCard/GroupListCard';

type GroupListItemProps = RenderItemParams<Group> & {
  sorting: boolean;
};

const GroupListItem: FC<GroupListItemProps> = ({item, ...props}) => {
  const {group, setGroup} = useGroupViewContext();

  useEffect(() => {
    setGroup(item);
  }, [item]);

  return group ? <GroupListCard {...props} /> : null;
};

export default flowRight([withGroupView, withItemList, withUserList])(GroupListItem);
