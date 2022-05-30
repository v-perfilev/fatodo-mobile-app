import {createSlice} from '@reduxjs/toolkit';
import {GroupsState} from './groupsType';
import GroupsThunks from './groupsThunks';
import {MapUtils} from '../../shared/utils/MapUtils';
import {Item} from '../../models/Item';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {Group} from '../../models/Group';

const filterItems = (items: Item[]): Item[] => {
  return items
    .filter(ArrayUtils.withIdFilter)
    .filter(ArrayUtils.uniqueByIdFilter)
    .sort(ArrayUtils.createdAtDescComparator);
};

const initialState: GroupsState = {
  groups: [],
  cachedGroups: [],
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
    setGroups: (state: GroupsState, action) => {
      const groups = action.payload;
      return {...state, groups};
    },

    cacheGroups: (state: GroupsState) => {
      const cachedGroups = state.groups;
      return {...state, cachedGroups};
    },

    resetGroupsFromCache: (state: GroupsState) => {
      const cachedGroupIds = state.cachedGroups.map((g) => g.id);
      const newGroups = state.groups.filter((g) => !cachedGroupIds.includes(g.id));
      const groups = [...newGroups, ...state.cachedGroups];
      const cachedGroups = [] as Group[];
      return {...state, groups, cachedGroups};
    },

    setCollapsed: (state: GroupsState, action) => {
      const itemsCollapsed = MapUtils.setValue(state.itemsCollapsed, action.payload.id, action.payload.value);
      return {...state, itemsCollapsed};
    },

    setAllCollapsed: (state: GroupsState, action) => {
      const itemsCollapsed = MapUtils.setAllValues(state.itemsCollapsed, action.payload);
      return {...state, itemsCollapsed};
    },

    addGroup: (state: GroupsState, action) => {
      const group = action.payload;
      const groups = [...state.groups, group];
      return {...state, groups};
    },

    updateGroup: (state: GroupsState, action) => {
      const group = action.payload;
      const groups = ArrayUtils.updateValue(state.groups, group);
      return {...state, groups};
    },

    removeGroup: (state: GroupsState, action) => {
      const group = action.payload as Group;
      const groups = ArrayUtils.deleteValueById(state.groups, group.id);
      const items = MapUtils.deleteValue(state.items, group.id);
      const itemsCount = MapUtils.deleteValue(state.itemsCount, group.id);
      const itemsCollapsed = MapUtils.deleteValue(state.itemsCollapsed, group.id);
      const itemsLoading = MapUtils.deleteValue(state.itemsLoading, group.id);
      return {...state, groups, items, itemsCount, itemsCollapsed, itemsLoading};
    },

    addItem: (state: GroupsState, action) => {
      const item = action.payload as Item;
      const newItemsValue = filterItems([item, ...MapUtils.getValue(state.items, item.groupId)]);
      const items = MapUtils.setValue(state.items, item.groupId, newItemsValue);
      const newItemsCountValue = MapUtils.getValue(state.itemsCount, item.groupId) + 1;
      const itemsCount = MapUtils.setValue(state.itemsCount, item.groupId, newItemsCountValue);
      return {...state, items, itemsCount};
    },

    updateItem: (state: GroupsState, action) => {
      const item = action.payload as Item;
      let items = state.items;
      if (!item.archived) {
        const newItemsValue = ArrayUtils.updateValue(MapUtils.getValue(state.items, item.groupId), item);
        items = MapUtils.setValue(state.items, item.groupId, newItemsValue);
      }
      return {...state, items};
    },

    removeItem: (state: GroupsState, action) => {
      const item = action.payload as Item;
      let items = state.items;
      let itemsCount = state.itemsCount;
      if (!item.archived) {
        const newItemsValue = ArrayUtils.deleteValue(MapUtils.getValue(state.items, item.groupId), item);
        items = MapUtils.setValue(state.items, item.groupId, newItemsValue);
        const newItemsCountValue = MapUtils.getValue(state.itemsCount, item.groupId) - 1;
        itemsCount = MapUtils.setValue(state.itemsCount, item.groupId, newItemsCountValue);
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
      const items = MapUtils.setValues(state.items, groupIds, []);
      const itemsCount = MapUtils.setValues(state.itemsCount, groupIds, 0);
      const itemsCollapsed = MapUtils.setValues(state.itemsCollapsed, groupIds, false);
      const itemsLoading = MapUtils.setValues(state.itemsLoading, groupIds, true);
      return {...state, items, itemsCount, itemsCollapsed, itemsLoading};
    });
    builder.addCase(GroupsThunks.fetchItems.fulfilled, (state: GroupsState, action) => {
      const groupIds = action.meta.arg;
      const pageableListMap = new Map(Object.entries(action.payload));
      const itemFunc = (id: string): Item[] => (pageableListMap.has(id) ? pageableListMap.get(id).data : []);
      const countFunc = (id: string): number => (pageableListMap.has(id) ? pageableListMap.get(id).count : 0);
      const items = MapUtils.setValuesFunc(state.items, groupIds, itemFunc);
      const itemsCount = MapUtils.setValuesFunc(state.itemsCount, groupIds, countFunc);
      const itemsLoading = MapUtils.setValues(state.itemsLoading, groupIds, false);
      return {...state, items, itemsCount, itemsLoading};
    });
    builder.addCase(GroupsThunks.fetchItems.rejected, (state: GroupsState, action) => {
      const groupIds = action.meta.arg;
      const itemsLoading = MapUtils.setValues(state.itemsLoading, groupIds, false);
      return {...state, itemsLoading};
    });

    /*
    fetchMoreItems
    */
    builder.addCase(GroupsThunks.fetchMoreItems.pending, (state: GroupsState, action) => {
      const groupId = action.meta.arg.groupId;
      const itemsLoading = MapUtils.setValue(state.itemsLoading, groupId, true);
      return {...state, itemsLoading};
    });
    builder.addCase(GroupsThunks.fetchMoreItems.fulfilled, (state: GroupsState, action) => {
      const groupId = action.meta.arg.groupId;
      const newItemsValue = filterItems([...(MapUtils.getValue(state.items, groupId) || []), ...action.payload.data]);
      const items = MapUtils.setValue(state.items, groupId, newItemsValue);
      const itemsCount = MapUtils.setValue(state.itemsCount, groupId, action.payload.count);
      const itemsLoading = MapUtils.setValue(state.itemsLoading, groupId, false);

      return {...state, items, itemsCount, itemsLoading};
    });
    builder.addCase(GroupsThunks.fetchMoreItems.rejected, (state: GroupsState, action) => {
      const groupId = action.meta.arg.groupId;
      const itemsLoading = MapUtils.setValue(state.itemsLoading, groupId, false);
      return {...state, itemsLoading};
    });
  },
});

export default groupsSlice;
