import * as React from 'react';
import {ComponentType, useMemo, useState} from 'react';
import {Item} from '../../../models/Item';
import {ArrayUtils} from '../../utils/ArrayUtils';
import {PageableList} from '../../../models/PageableList';
import ItemService from '../../../services/ItemService';
import {GroupListItemsContext} from '../../contexts/listContexts/groupListItemsContext';

const withGroupListItems = (Component: ComponentType) => (props: any) => {
  const [items, setItems] = useState<Map<string, Item[]>>(new Map());
  const [counts, setCounts] = useState<Map<string, number>>(new Map());
  const [loading, setLoadingMap] = useState<Map<string, boolean>>(new Map());
  const [collapsed, setCollapsedMap] = useState<Map<string, boolean>>(new Map());

  const filterItems = (items: Item[]): Item[] =>
    items.filter(ArrayUtils.withIdFilter).filter(ArrayUtils.uniqueByIdFilter).sort(ArrayUtils.createdAtDescComparator);

  const updateItems = (itemMap: Map<string, PageableList<Item>>): void => {
    setItems((prevState) => {
      itemMap.forEach((newItems, groupId) => {
        const prevItems = prevState.has(groupId) ? prevState.get(groupId) : [];
        const combinedItems = [...prevItems, ...newItems.data];
        const filteredItems = filterItems(combinedItems);
        prevState.set(groupId, filteredItems);
      });
      return new Map(prevState);
    });
    setCounts((prevState) => {
      itemMap.forEach((newItems, groupId) => {
        prevState.set(groupId, newItems.count);
      });
      return new Map(prevState);
    });
  };

  const setLoading = (groupIds: string[], value: boolean): void => {
    setLoadingMap((prevState) => {
      groupIds.forEach((groupId) => prevState.set(groupId, value));
      return new Map(prevState);
    });
  };

  const setCollapsed = (groupIds: string[], value: boolean): void => {
    setCollapsedMap((prevState) => {
      groupIds.forEach((groupId) => prevState.set(groupId, value));
      return new Map(prevState);
    });
  };

  const deleteGroup = (groupId: string): void => {
    setItems((prevState) => {
      prevState.delete(groupId);
      return new Map(prevState);
    });
    setCounts((prevState) => {
      prevState.delete(groupId);
      return new Map(prevState);
    });
    setLoadingMap((prevState) => {
      prevState.delete(groupId);
      return new Map(prevState);
    });
    setCollapsedMap((prevState) => {
      prevState.delete(groupId);
      return new Map(prevState);
    });
  };

  const loadInitialState = (groupIds: string[]): void => {
    setLoading(groupIds, true);
    ItemService.getPreviewItemsByGroupIds(groupIds)
      .then((response) => {
        const itemMap = new Map(Object.entries(response.data));
        updateItems(itemMap);
      })
      .finally(() => {
        setLoading(groupIds, false);
        setCollapsed(groupIds, false);
      });
  };

  const loadMore = (groupId: string, offset: number, size: number): void => {
    setLoading([groupId], true);
    ItemService.getItemsByGroupId(groupId, offset, size)
      .then((response) => {
        const itemMap = new Map([[groupId, response.data]]);
        updateItems(itemMap);
      })
      .finally(() => {
        setLoading([groupId], false);
      });
  };

  const allCollapsed = useMemo<boolean>(() => {
    return collapsed.size ? Array.from(collapsed.values()).every(Boolean) : false;
  }, [collapsed]);

  const setAllCollapsed = (value: boolean): void => {
    setCollapsedMap((prevState) => {
      Array.from(prevState.keys()).forEach((groupId) => prevState.set(groupId, value));
      return new Map(prevState);
    });
  };

  const context = {
    items,
    counts,
    deleteGroup,
    loadInitialState,
    loadMore,
    loading,
    collapsed,
    setCollapsed,
    allCollapsed,
    setAllCollapsed,
  };

  return (
    <GroupListItemsContext.Provider value={context}>
      <Component {...props} />
    </GroupListItemsContext.Provider>
  );
};

export default withGroupListItems;
