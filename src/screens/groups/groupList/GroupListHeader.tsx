import React, {memo} from 'react';
import Header from '../../../components/layouts/Header';
import CheckIcon from '../../../components/icons/CheckIcon';
import CloseIcon from '../../../components/icons/CloseIcon';
import ReorderIcon from '../../../components/icons/ReorderIcon';
import CollapsedIcon from '../../../components/icons/CollapsedIcon';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import {GroupsActions} from '../../../store/groups/groupsActions';
import IconButton from '../../../components/controls/IconButton';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../navigators/GroupNavigator';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';

type GroupListHeaderProps = {
  sorting: boolean;
  setSorting: (sorting: boolean) => void;
};

const GroupListHeader = ({sorting, setSorting}: GroupListHeaderProps) => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(GroupsSelectors.groups);
  const allCollapsed = useAppSelector(GroupsSelectors.itemsAllCollapsed);
  const groupNavigation = useNavigation<GroupNavigationProps>();

  const goToItemList = (): void => {
    groupNavigation.replace('ItemList');
  };

  const setAllCollapsed = (value: boolean): void => {
    dispatch(GroupsActions.setAllCollapsed(value));
  };

  const saveOrder = (): void => {
    const orderedGroupIds = groups.map((g) => g.id);
    dispatch(GroupsActions.updateOrderThunk(orderedGroupIds));
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
    setTimeout(() => setSorting(true), allCollapsed ? 0 : 250);
  };

  const saveSorting = (): void => {
    saveOrder();
    setSorting(false);
    setTimeout(() => setAllCollapsed(false), 50);
  };

  const cancelSorting = (): void => {
    resetOrder();
    setSorting(false);
    setTimeout(() => setAllCollapsed(false), 50);
  };

  return (
    <Header
      showAvatar
      hideGoBack
      afterTitle={<ArrowDownIcon color="primary.500" size="lg" mt="1" />}
      onTitleClick={goToItemList}
    >
      {sorting ? (
        <>
          <IconButton size="2xl" icon={<CheckIcon />} onPress={saveSorting} />
          <IconButton size="2xl" icon={<CloseIcon />} onPress={cancelSorting} />
        </>
      ) : (
        <>
          <IconButton size="2xl" icon={<ReorderIcon />} onPress={enableSorting} />
          <IconButton size="3xl" p="0.5" icon={<CollapsedIcon collapsed={!allCollapsed} />} onPress={switchCollapsed} />
        </>
      )}
    </Header>
  );
};

export default memo(GroupListHeader);
