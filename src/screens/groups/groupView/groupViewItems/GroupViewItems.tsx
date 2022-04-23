import React, {FC, useEffect, useMemo, useState} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {UserAccount} from '../../../../models/User';
import {useUserListContext} from '../../../../shared/contexts/listContexts/userListContext';
import {useLoadingState} from '../../../../shared/hooks/useLoadingState';
import {Flex} from 'native-base';
import {useArchivedItemListContext} from '../../../../shared/contexts/listContexts/archivedItemListContext';
import {useItemListContext} from '../../../../shared/contexts/listContexts/itemListContext';
import {Item} from '../../../../models/Item';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import {CARD_ITEMS_COUNT, GROUP_ITEMS_COUNT} from '../../../../constants';
import GroupViewItemsSkeleton from '../groupViewSkeletons/GroupViewItemsSkeleton';
import GroupViewItemsPagination from './GroupViewItemsPagination';
import GroupViewItemsCreateButton from './GroupViewItemsCreateButton';
import GroupViewItem from '../groupViewItem/GroupViewItem';

type GroupViewItemsProps = {
  showArchived: boolean;
  account: UserAccount;
};

const GroupViewItems: FC<GroupViewItemsProps> = ({showArchived, account}) => {
  const {handleUserIds} = useUserListContext();
  const {group} = useGroupViewContext();
  const {items: active, count: activeCount, load: loadActive, loading: activeLoading} = useItemListContext();
  const {
    items: archived,
    count: archivedCount,
    load: loadArchived,
    loading: archivedLoading,
  } = useArchivedItemListContext();
  const [loading, setLoading] = useLoadingState();
  const [page, setPage] = useState<number>(0);

  const items = useMemo<Item[]>(() => {
    return showArchived ? archived : active;
  }, [active, archived, showArchived]);

  const count = useMemo<number>(() => {
    return showArchived ? archivedCount : activeCount;
  }, [activeCount, archivedCount, showArchived]);

  const totalPages = useMemo<number>(() => {
    return Math.floor(count / GROUP_ITEMS_COUNT) + (count % GROUP_ITEMS_COUNT > 0 ? 1 : 0);
  }, [count]);

  const itemsToShow = useMemo<Item[]>(() => {
    const firstShownItem = GROUP_ITEMS_COUNT * page;
    return items.length > firstShownItem ? items.slice(firstShownItem, firstShownItem + GROUP_ITEMS_COUNT) : [];
  }, [items, page]);

  const loadItemsUsers = (): void => {
    const userIds = items.reduce((acc, item) => [...acc, item.createdBy, item.lastModifiedBy], []);
    handleUserIds(userIds);
  };

  const resetPage = (): void => {
    setPage(0);
  };

  const loadInitial = (load: (groupId: string, offset?: number, size?: number) => void): void => {
    load(group.id);
  };

  const loadMoreIfNeeded = (load: (groupId: string, offset: number, size: number) => void): void => {
    const firstShownItem = GROUP_ITEMS_COUNT * page;
    if (items.length < count && items.length < firstShownItem + GROUP_ITEMS_COUNT) {
      load(group.id, items.length, CARD_ITEMS_COUNT * 2);
    }
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      loadItemsUsers();
    }
  }, [items]);

  useEffect(() => {
    resetPage();
    if (showArchived) {
      loadInitial(loadArchived);
    } else {
      loadInitial(loadActive);
    }
  }, [group.id, showArchived]);

  useEffect(() => {
    if (page > 0 && showArchived) {
      loadMoreIfNeeded(loadArchived);
    } else if (page > 0 && !showArchived) {
      loadMoreIfNeeded(loadActive);
    }
  }, [page]);

  useEffect(() => {
    const newLoading = activeLoading || archivedLoading;
    setLoading(newLoading);
  }, [activeLoading, archivedLoading]);

  const canEdit = useMemo<boolean>(() => group && GroupUtils.canEdit(account, group), [group, account]);

  return (
    <Flex m="1">
      <GroupViewItemsCreateButton group={group} />
      {loading && <GroupViewItemsSkeleton />}
      {!loading && itemsToShow.map((item) => <GroupViewItem item={item} canEdit={canEdit} key={item.id} />)}
      {!loading && <GroupViewItemsPagination page={page} totalPages={totalPages} setPage={setPage} />}
    </Flex>
  );
};

export default GroupViewItems;
