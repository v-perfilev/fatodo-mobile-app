import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GroupsState} from './groupsType';
import {MapUtils} from '../../shared/utils/MapUtils';
import {Item} from '../../models/Item';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {Group} from '../../models/Group';
import {GroupsActions} from './groupsActions';
import {GroupUtils} from '../../shared/utils/GroupUtils';
import {ComparatorUtils} from '../../shared/utils/ComparatorUtils';

interface GroupsCollapsedPayload {
  groupId: string;
  value: boolean;
}

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
    reset: () => initialState,

    setGroups: (state: GroupsState, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },

    cacheGroups: (state: GroupsState) => {
      state.cachedGroups = state.groups;
    },

    resetGroupsFromCache: (state: GroupsState) => {
      const cachedGroupIds = state.cachedGroups.map((g) => g.id);
      const newGroups = state.groups.filter((g) => !cachedGroupIds.includes(g.id));
      state.groups = [...newGroups, ...state.cachedGroups];
      state.cachedGroups = [];
    },

    setCollapsed: (state: GroupsState, action: PayloadAction<GroupsCollapsedPayload>) => {
      const groupId = action.payload.groupId;
      const value = action.payload.value;
      state.itemsCollapsed = MapUtils.setValue(state.itemsCollapsed, groupId, value);
    },

    setAllCollapsed: (state: GroupsState, action: PayloadAction<boolean>) => {
      const value = action.payload;
      state.itemsCollapsed = MapUtils.setAllValues(state.itemsCollapsed, value);
    },

    addGroup: (state: GroupsState, action: PayloadAction<Group>) => {
      const group = action.payload;
      state.groups = [...state.groups, group];
    },

    updateGroup: (state: GroupsState, action: PayloadAction<Group>) => {
      const group = action.payload;
      state.groups = ArrayUtils.updateValueWithId(state.groups, group);
    },

    removeGroup: (state: GroupsState, action: PayloadAction<string>) => {
      const groupId = action.payload;
      const group = ArrayUtils.findValueById(state.groups, groupId);
      if (group) {
        state.groups = ArrayUtils.deleteValueWithId(state.groups, group);
        state.items = MapUtils.deleteValue(state.items, group.id);
        state.itemsCount = MapUtils.deleteValue(state.itemsCount, group.id);
        state.itemsCollapsed = MapUtils.deleteValue(state.itemsCollapsed, group.id);
        state.itemsLoading = MapUtils.deleteValue(state.itemsLoading, group.id);
      }
    },

    addItem: (state: GroupsState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const newItemsValue = GroupUtils.filterItems([item, ...MapUtils.getValue(state.items, item.groupId)]);
      const newItemsCountValue = MapUtils.getValue(state.itemsCount, item.groupId) + 1;
      state.items = MapUtils.setValue(state.items, item.groupId, newItemsValue);
      state.itemsCount = MapUtils.setValue(state.itemsCount, item.groupId, newItemsCountValue);
    },

    updateItem: (state: GroupsState, action: PayloadAction<Item>) => {
      const item = action.payload;
      if (!item.archived) {
        const newItemsValue = ArrayUtils.updateValueWithId(MapUtils.getValue(state.items, item.groupId), item);
        state.items = MapUtils.setValue(state.items, item.groupId, newItemsValue);
      }
    },

    removeItem: (state: GroupsState, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const map = new Map(state.items);
      const itemArray = Array.from(map.values()).flatMap((items) => items);
      const item = ArrayUtils.findValueById(itemArray, itemId);
      if (item && !item.archived) {
        const newItemsValue = ArrayUtils.deleteValueWithId(MapUtils.getValue(state.items, item.groupId), item);
        const newItemsCountValue = MapUtils.getValue(state.itemsCount, item.groupId) - 1;
        state.items = MapUtils.setValue(state.items, item.groupId, newItemsValue);
        state.itemsCount = MapUtils.setValue(state.itemsCount, item.groupId, newItemsCountValue);
      }
    },
  },
  extraReducers: (builder) => {
    /*
    fetchGroups
    */
    builder.addCase(GroupsActions.fetchGroupsThunk.pending, (state: GroupsState) => {
      state.loading = true;
    });
    builder.addCase(GroupsActions.fetchGroupsThunk.fulfilled, (state: GroupsState, action) => {
      state.groups = action.payload;
      state.loading = false;
    });
    builder.addCase(GroupsActions.fetchGroupsThunk.rejected, (state: GroupsState) => {
      state.loading = false;
    });

    /*
    fetchItems
    */
    builder.addCase(GroupsActions.fetchItemsThunk.pending, (state: GroupsState, action) => {
      const groupIds = action.meta.arg;
      state.items = MapUtils.setValues(state.items, groupIds, []);
      state.itemsCount = MapUtils.setValues(state.itemsCount, groupIds, 0);
      state.itemsCollapsed = MapUtils.setValues(state.itemsCollapsed, groupIds, false);
      state.itemsLoading = MapUtils.setValues(state.itemsLoading, groupIds, true);
    });
    builder.addCase(GroupsActions.fetchItemsThunk.fulfilled, (state: GroupsState, action) => {
      const groupIds = action.meta.arg;
      const pageableListMap = new Map(Object.entries(action.payload));
      const itemFunc = (id: string): Item[] =>
        pageableListMap.has(id) ? pageableListMap.get(id).data.sort(ComparatorUtils.createdAtDescComparator) : [];
      const countFunc = (id: string): number => (pageableListMap.has(id) ? pageableListMap.get(id).count : 0);
      state.items = MapUtils.setValuesFunc(state.items, groupIds, itemFunc);
      state.itemsCount = MapUtils.setValuesFunc(state.itemsCount, groupIds, countFunc);
      state.itemsLoading = MapUtils.setValues(state.itemsLoading, groupIds, false);
    });
    builder.addCase(GroupsActions.fetchItemsThunk.rejected, (state: GroupsState, action) => {
      const groupIds = action.meta.arg;
      state.itemsLoading = MapUtils.setValues(state.itemsLoading, groupIds, false);
    });
  },
});

export default groupsSlice;
