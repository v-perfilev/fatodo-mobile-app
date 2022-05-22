import {createSlice} from '@reduxjs/toolkit';
import {GroupsState} from './groupsType';
import GroupsThunks from './groupsThunks';
import {MapUtils} from '../../shared/utils/MapUtils';
import {Item} from '../../models/Item';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {Group} from '../../models/Group';

const filterItems = (items: Item[]): Item[] =>
  items.filter(ArrayUtils.withIdFilter).filter(ArrayUtils.uniqueByIdFilter).sort(ArrayUtils.createdAtDescComparator);

const initialState: GroupsState = {
  groups: [],
  loading: false,
  items: [],
  itemsCollapsed: [],
  itemsCount: [],
  itemsLoading: [],
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state: GroupsState, action) => ({
      ...state,
      groups: action.payload,
    }),

    setCollapsed: (state: GroupsState, action) => {
      const id = action.payload.id;
      const value = action.payload.value;
      const itemCollapsedMap = MapUtils.setValue(new Map(state.itemsCollapsed), id, value);
      const itemsCollapsed = [...itemCollapsedMap];
      return {...state, itemsCollapsed};
    },

    setAllCollapsed: (state: GroupsState, action) => {
      const itemCollapsedMap = MapUtils.setAllValues(new Map(state.itemsCollapsed), action.payload);
      const itemsCollapsed = [...itemCollapsedMap];
      return {...state, itemsCollapsed};
    },

    createGroup: (state: GroupsState, action) => {
      const group = action.payload as Group;
      const groups = [group, ...state.groups];
      return {...state, groups};
    },

    updateGroup: (state: GroupsState, action) => {
      const group = action.payload as Group;
      const groups = ArrayUtils.updateValue(state.groups, group);
      return {...state, groups};
    },

    deleteGroup: (state: GroupsState, action) => {
      const group = action.payload as Group;
      const groups = ArrayUtils.deleteValueById(state.groups, group.id);
      return {...state, groups};
    },

    createItem: (state: GroupsState, action) => {
      const item = action.payload as Item;
      const groupId = item.groupId;

      const oldItemsMap = new Map(state.items);
      const newItemsValue = filterItems([item, ...oldItemsMap.get(groupId)]);
      const itemsMap = MapUtils.setValue(oldItemsMap, groupId, newItemsValue);
      const items = [...itemsMap];

      const oldItemsCountMap = new Map(state.itemsCount);
      const newItemsCountValue = oldItemsCountMap.get(groupId) + 1;
      const itemsCountMap = MapUtils.setValue(oldItemsCountMap, groupId, newItemsCountValue);
      const itemsCount = [...itemsCountMap];

      return {...state, items, itemsCount};
    },

    updateItem: (state: GroupsState, action) => {
      const item = action.payload as Item;
      const groupId = item.groupId;
      const isArchived = item.archived;

      let items = state.items;
      if (!isArchived) {
        const oldItemsMap = new Map(state.items);
        const newItemsValue = ArrayUtils.updateValue(oldItemsMap.get(groupId), item);
        const itemsMap = MapUtils.setValue(oldItemsMap, groupId, newItemsValue);
        items = [...itemsMap];
      }

      return {...state, items};
    },

    deleteItem: (state: GroupsState, action) => {
      const item = action.payload as Item;
      const groupId = item.groupId;
      const isArchived = item.archived;

      let items = state.items;
      if (!isArchived) {
        const oldItemsMap = new Map(state.items);
        const newItemsValue = ArrayUtils.deleteValue(oldItemsMap.get(groupId), item);
        const itemsMap = MapUtils.setValue(oldItemsMap, groupId, newItemsValue);
        items = [...itemsMap];
      }

      let itemsCount = state.itemsCount;
      if (!isArchived) {
        const oldItemsCountMap = new Map(state.itemsCount);
        const newItemsCountValue = oldItemsCountMap.get(groupId) - 1;
        const itemsCountMap = MapUtils.setValue(oldItemsCountMap, groupId, newItemsCountValue);
        itemsCount = [...itemsCountMap];
      }

      return {...state, items, itemsCount};
    },
  },
  extraReducers: (builder) => {
    /*
    fetchGroups
    */
    builder.addCase(GroupsThunks.fetchGroups.pending, () => ({
      ...initialState,
      loading: true,
    }));
    builder.addCase(GroupsThunks.fetchGroups.fulfilled, (state: GroupsState, action) => ({
      ...state,
      groups: action.payload,
      loading: false,
    }));
    builder.addCase(GroupsThunks.fetchGroups.rejected, () => ({
      ...initialState,
      loading: false,
    }));

    /*
    fetchItems
    */
    builder.addCase(GroupsThunks.fetchItems.pending, (state: GroupsState, action) => {
      const groupIds = action.meta.arg;

      const itemsMap = MapUtils.setValues(new Map(), groupIds, []);
      const items = [...itemsMap];
      const itemsCountMap = MapUtils.setValues(new Map(), groupIds, 0);
      const itemsCount = [...itemsCountMap];
      const itemsCollapsedMap = MapUtils.setValues(new Map(), groupIds, false);
      const itemsCollapsed = [...itemsCollapsedMap];
      const itemsLoadingMap = MapUtils.setValues(new Map(), groupIds, true);
      const itemsLoading = [...itemsLoadingMap];

      return {...state, items, itemsCount, itemsCollapsed, itemsLoading};
    });
    builder.addCase(GroupsThunks.fetchItems.fulfilled, (state: GroupsState, action) => {
      const groupIds = action.meta.arg;
      const pageableListMap = new Map(Object.entries(action.payload));

      const itemFunc = (id: string): Item[] => (pageableListMap.has(id) ? pageableListMap.get(id).data : []);
      const countFunc = (id: string): number => (pageableListMap.has(id) ? pageableListMap.get(id).count : 0);

      const itemsMap = MapUtils.setValuesFunc(new Map(state.items), groupIds, itemFunc);
      const items = [...itemsMap];
      const itemsCountMap = MapUtils.setValuesFunc(new Map(state.itemsCount), groupIds, countFunc);
      const itemsCount = [...itemsCountMap];
      const itemsLoadingMap = MapUtils.setValues(new Map(state.itemsLoading), groupIds, false);
      const itemsLoading = [...itemsLoadingMap];

      return {...state, items, itemsCount, itemsLoading};
    });
    builder.addCase(GroupsThunks.fetchItems.rejected, (state: GroupsState, action) => {
      const groupIds = action.meta.arg;

      const itemsLoadingMap = MapUtils.setValues(new Map(state.itemsLoading), groupIds, false);
      const itemsLoading = [...itemsLoadingMap];

      return {...state, itemsLoading};
    });

    /*
    fetchMoreItems
    */
    builder.addCase(GroupsThunks.fetchMoreItems.pending, (state: GroupsState, action) => {
      const groupId = action.meta.arg.groupId;

      const itemsLoadingMap = MapUtils.setValue(new Map(state.itemsLoading), groupId, false);
      const itemsLoading = [...itemsLoadingMap];

      return {...state, itemsLoading};
    });
    builder.addCase(GroupsThunks.fetchMoreItems.fulfilled, (state: GroupsState, action) => {
      const groupId = action.meta.arg.groupId;
      const newItems = filterItems([...(new Map(state.items).get(groupId) || []), ...action.payload.data]);

      const itemsMap = MapUtils.setValue(new Map(state.items), groupId, newItems);
      const items = [...itemsMap];
      const itemsCountMap = MapUtils.setValue(new Map(state.itemsCount), groupId, action.payload.count);
      const itemsCount = [...itemsCountMap];
      const itemsLoadingMap = MapUtils.setValue(new Map(state.itemsLoading), groupId, false);
      const itemsLoading = [...itemsLoadingMap];

      return {...state, items, itemsCount, itemsLoading};
    });
    builder.addCase(GroupsThunks.fetchMoreItems.rejected, (state: GroupsState, action) => {
      const groupId = action.meta.arg.groupId;
      const itemsLoadingMap = MapUtils.setValue(new Map(state.itemsLoading), groupId, false);
      const itemsLoading = [...itemsLoadingMap];

      return {...state, itemsLoading};
    });

    /*
    deleteGroup
    */
    builder.addCase(GroupsThunks.deleteGroup.fulfilled, (state: GroupsState, action) => {
      const groupId = action.meta.arg;

      const groups = ArrayUtils.deleteValueById(state.groups, groupId);

      const itemsMap = MapUtils.deleteValue(new Map(state.items), groupId);
      const items = [...itemsMap];
      const itemsCountMap = MapUtils.deleteValue(new Map(state.itemsCount), groupId);
      const itemsCount = [...itemsCountMap];
      const itemsCollapsedMap = MapUtils.deleteValue(new Map(state.itemsCollapsed), groupId);
      const itemsCollapsed = [...itemsCollapsedMap];
      const itemsLoadingMap = MapUtils.deleteValue(new Map(state.itemsLoading), groupId);
      const itemsLoading = [...itemsLoadingMap];

      return {...state, groups, items, itemsCount, itemsCollapsed, itemsLoading};
    });
  },
});
export default groupsSlice;
