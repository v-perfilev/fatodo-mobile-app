import React, {FC, useEffect} from 'react';
import {Center, Container, Spinner} from 'native-base';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import withGroupListItems from '../../../shared/hocs/withLists/withGroupListItems';
import withGroupList from '../../../shared/hocs/withLists/withGroupList';
import {useGroupListContext} from '../../../shared/contexts/listContexts/groupListContext';
import GroupListContainer from './GroupListContainer';
import {useGroupListItemsContext} from '../../../shared/contexts/listContexts/groupListItemsContext';

const GroupList: FC = () => {
  const {groups, load: loadGroups, loading: groupsLoading} = useGroupListContext();
  const {loadInitialState} = useGroupListItemsContext();

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      const groupIds = groups.map((g) => g.id);
      loadInitialState(groupIds);
    }
  }, [groups]);

  return groupsLoading ? (
    <Center flex={1}>
      <Spinner />
    </Center>
  ) : (
    <Container>
      <GroupListContainer />
    </Container>
  );
};

export default flowRight([withHeader, withGroupList, withGroupListItems])(GroupList);
