import React, {FC, useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import withGroupListItems from '../../../shared/hocs/withLists/withGroupListItems';
import withGroupList from '../../../shared/hocs/withLists/withGroupList';
import {useGroupListContext} from '../../../shared/contexts/listContexts/groupListContext';
import GroupListContainer from './GroupListContainer';
import {useGroupListItemsContext} from '../../../shared/contexts/listContexts/groupListItemsContext';
import ItemService from '../../../services/ItemService';
import {useSnackContext} from '../../../shared/contexts/SnackContext';
import CentredSpinner from '../../../components/layouts/CentredSpinner';
import withContainer from '../../../shared/hocs/withContainer';

const GroupList: FC = () => {
  const {handleCode, handleResponse} = useSnackContext();
  const {groups, load: loadGroups, loading: groupsLoading} = useGroupListContext();
  const {loadInitialState, allCollapsed, setAllCollapsed} = useGroupListItemsContext();
  const [sorting, setSorting] = useState<boolean>(false);

  const saveOrder = (): void => {
    const orderedGroupIds = groups.map((g) => g.id);
    ItemService.setGroupOrder(orderedGroupIds)
      .then(() => {
        handleCode('group.sorted', 'info');
      })
      .catch(({response}) => {
        handleResponse(response);
      });
  };

  const collapseAll = (): void => setAllCollapsed(true);
  const expandAll = (): void => setAllCollapsed(false);

  const enableSorting = (): void => {
    setAllCollapsed(true);
    setTimeout(
      () => {
        setSorting(true);
      },
      allCollapsed ? 0 : 500,
    );
  };

  const saveSorting = (): void => {
    setAllCollapsed(false);
    setSorting(false);
    saveOrder();
  };

  const cancelSorting = (): void => {
    setAllCollapsed(false);
    setSorting(false);
  };

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      const groupIds = groups.map((g) => g.id);
      loadInitialState(groupIds);
    }
  }, [groups.length]);

  return groupsLoading ? <CentredSpinner /> : <GroupListContainer sorting={sorting} />;
};

export default flowRight([withHeader, withContainer, withGroupList, withGroupListItems])(GroupList);
