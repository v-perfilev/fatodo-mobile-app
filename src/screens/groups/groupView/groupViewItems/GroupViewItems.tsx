import React, {useEffect, useMemo, useState} from 'react';
import {useDelayedState} from '../../../../shared/hooks/useDelayedState';
import {Item} from '../../../../models/Item';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import {GROUP_ITEMS_COUNT} from '../../../../constants';
import GroupViewItemsSkeleton from '../groupViewSkeletons/GroupViewItemsSkeleton';
import GroupViewItemsCreateButton from './GroupViewItemsCreateButton';
import GroupViewItem from '../groupViewItem/GroupViewItem';
import GroupViewItemsPagination from './GroupViewItemsPagination';
import GroupViewItemsArchivedSwitch from './GroupViewItemsArchivedSwitch';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import GroupSelectors from '../../../../store/group/groupSelectors';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {UsersThunks} from '../../../../store/users/usersActions';
import {GroupThunks} from '../../../../store/group/groupActions';

type GroupViewItemsProps = {
  showArchived: boolean;
  setShowArchived: (archived: boolean) => void;
};

const GroupViewItems = ({showArchived, setShowArchived}: GroupViewItemsProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const group = useAppSelector(GroupSelectors.group);
  const activeItemsCount = useAppSelector(GroupSelectors.activeItemsCount);
  const archivedItemsCount = useAppSelector(GroupSelectors.archivedItemsCount);
  const activeItems = useAppSelector(GroupSelectors.activeItems);
  const archivedItems = useAppSelector(GroupSelectors.archivedItems);
  const [loading, setLoading] = useDelayedState(true);
  const [page, setPage] = useState<number>(0);

  const items = useMemo<Item[]>(() => {
    return showArchived ? archivedItems : activeItems;
  }, [activeItems, archivedItems, showArchived]);

  const count = useMemo<number>(() => {
    return showArchived ? archivedItemsCount : activeItemsCount;
  }, [activeItemsCount, archivedItemsCount, showArchived]);

  const totalPages = useMemo<number>(() => {
    return Math.floor(count / GROUP_ITEMS_COUNT) + (count % GROUP_ITEMS_COUNT > 0 ? 1 : 0);
  }, [count]);

  const itemsToShow = useMemo<Item[]>(() => {
    const firstShownItem = GROUP_ITEMS_COUNT * page;
    return items.length > firstShownItem ? items.slice(firstShownItem, firstShownItem + GROUP_ITEMS_COUNT) : [];
  }, [items, page]);

  const loadItemsUsers = (): void => {
    const userIds = items.reduce((acc, item) => [...acc, item.createdBy, item.lastModifiedBy], []);
    dispatch(UsersThunks.handleUserIds(userIds));
  };

  const resetPage = (): void => {
    setPage(0);
  };

  const loadActive = (groupId: string, offset?: number, size?: number): void => {
    setLoading(true);
    dispatch(GroupThunks.fetchActiveItems({groupId, offset, size})).then(() => setLoading(false));
  };

  const loadArchived = (groupId: string, offset?: number, size?: number): void => {
    setLoading(true);
    dispatch(GroupThunks.fetchArchivedItems({groupId, offset, size})).then(() => setLoading(false));
  };

  const loadInitial = (load: (groupId: string, offset?: number, size?: number) => void): void => {
    if (group?.id) {
      load(group.id);
    }
  };

  const loadMoreIfNeeded = (load: (groupId: string, offset: number, size: number) => void): void => {
    const firstShownItem = GROUP_ITEMS_COUNT * page;
    if (items.length < count && items.length < firstShownItem + GROUP_ITEMS_COUNT) {
      load(group.id, items.length, GROUP_ITEMS_COUNT * 2);
    }
  };

  useEffect(() => {
    if (items?.length > 0) {
      loadItemsUsers();
    }
  }, [items]);

  useEffect(() => {
    resetPage();
    if (showArchived && !archivedItemsCount) {
      loadInitial(loadArchived);
    } else if (!showArchived && !activeItemsCount) {
      loadInitial(loadActive);
    } else {
      setLoading(false);
    }
  }, [showArchived]);

  useEffect(() => {
    if (page > 0 && showArchived) {
      loadMoreIfNeeded(loadArchived);
    } else if (page > 0 && !showArchived) {
      loadMoreIfNeeded(loadActive);
    }
  }, [page]);

  const canEdit = useMemo<boolean>(() => group && GroupUtils.canEdit(account, group), [group, account]);

  return (
    <FVStack space="2">
      <FHStack alignItems="center" justifyContent="space-between">
        <GroupViewItemsPagination page={page} setPage={setPage} totalPages={totalPages} />
        <GroupViewItemsArchivedSwitch showArchived={showArchived} setShowArchived={setShowArchived} />
      </FHStack>
      {!showArchived && <GroupViewItemsCreateButton />}
      {loading && <GroupViewItemsSkeleton />}
      {!loading && itemsToShow.map((item) => <GroupViewItem item={item} canEdit={canEdit} key={item.id} />)}
    </FVStack>
  );
};

export default GroupViewItems;
