import React, {memo} from 'react';
import Header from '../../../components/layouts/Header';
import CheckIcon from '../../../components/icons/CheckIcon';
import CloseIcon from '../../../components/icons/CloseIcon';
import ReorderIcon from '../../../components/icons/ReorderIcon';
import CollapsedIcon from '../../../components/icons/CollapsedIcon';
import {flowRight} from 'lodash';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import IconButton from '../../../components/controls/IconButton';
import {GroupsActions, GroupsThunks} from '../../../store/groups/groupsActions';

type GroupListHeaderProps = {
  sorting: boolean;
  setSorting: (sorting: boolean) => void;
};

const GroupListHeader = ({sorting, setSorting}: GroupListHeaderProps) => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(GroupsSelectors.groups);
  const allCollapsed = useAppSelector(GroupsSelectors.itemsAllCollapsed);

  const setAllCollapsed = (value: boolean): void => {
    dispatch(GroupsActions.setAllCollapsed(value));
  };

  const saveOrder = (): void => {
    const orderedGroupIds = groups.map((g) => g.id);
    dispatch(GroupsThunks.updateOrder(orderedGroupIds));
  };

  const cacheOrder = (): void => {
    dispatch(GroupsActions.cacheGroups());
  };

  const resetOrder = (): void => {
    dispatch(GroupsActions.resetGroupsFromCache());
  };

  const switchCollapsed = (): void => setAllCollapsed(!allCollapsed);

  const enableSorting = (): void => {
    cacheOrder();
    setAllCollapsed(true);
    setTimeout(
      () => {
        setSorting(true);
      },
      allCollapsed ? 0 : 300,
    );
  };

  const saveSorting = (): void => {
    saveOrder();
    setAllCollapsed(false);
    setSorting(false);
  };

  const cancelSorting = (): void => {
    resetOrder();
    setAllCollapsed(false);
    setSorting(false);
  };

  return (
    <Header>
      {sorting ? (
        <>
          <IconButton colorScheme="white" size="xl" p="1.5" icon={<CheckIcon />} onPress={saveSorting} />
          <IconButton colorScheme="white" size="xl" p="1.5" icon={<CloseIcon />} onPress={cancelSorting} />
        </>
      ) : (
        <>
          <IconButton colorScheme="white" size="xl" p="1.5" icon={<ReorderIcon />} onPress={enableSorting} />
          <IconButton
            colorScheme="white"
            size="2xl"
            p="1"
            icon={<CollapsedIcon visible={!allCollapsed} />}
            onPress={switchCollapsed}
          />
        </>
      )}
    </Header>
  );
};

export default flowRight([memo])(GroupListHeader);
