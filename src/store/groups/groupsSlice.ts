import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GroupsState} from './groupsType';
import {Item} from '../../models/Item';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {Group, GroupMember} from '../../models/Group';
import {GroupsActions} from './groupsActions';
import {GroupUtils} from '../../shared/utils/GroupUtils';
import {ComparatorUtils} from '../../shared/utils/ComparatorUtils';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {FilterUtils} from '../../shared/utils/FilterUtils';

interface GroupsCollapsedPayload {
  groupId: string;
  value: boolean;
}

interface GroupsWithMembersPayload {
  groupId: string;
  members: GroupMember[];
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
      state.itemsCollapsed = StoreUtils.setValue(state.itemsCollapsed, groupId, value);
    },

    setAllCollapsed: (state: GroupsState, action: PayloadAction<boolean>) => {
      const value = action.payload;
      state.itemsCollapsed = StoreUtils.setAllValues(state.itemsCollapsed, value);
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
        state.items = StoreUtils.deleteValue(state.items, group.id);
        state.itemsCount = StoreUtils.deleteValue(state.itemsCount, group.id);
        state.itemsCollapsed = StoreUtils.deleteValue(state.itemsCollapsed, group.id);
        state.itemsLoading = StoreUtils.deleteValue(state.itemsLoading, group.id);
      }
    },

    addMembers: (state: GroupsState, action: PayloadAction<GroupsWithMembersPayload>) => {
      const groupId = action.payload.groupId;
      const members = action.payload.members;
      const group = ArrayUtils.findValueById(state.groups, groupId) as Group;
      if (group) {
        group.members = [...group.members, ...members].filter(FilterUtils.uniqueByUserIdFilter);
        state.groups = ArrayUtils.updateValueWithId(state.groups, group);
      }
    },

    updateMembers: (state: GroupsState, action: PayloadAction<GroupsWithMembersPayload>) => {
      const groupId = action.payload.groupId;
      const members = action.payload.members;
      const group = ArrayUtils.findValueById(state.groups, groupId) as Group;
      if (group) {
        members.forEach((member) => {
          group.members = ArrayUtils.updateValueWithUserId(group.members, member);
        });
        state.groups = ArrayUtils.updateValueWithId(state.groups, group);
      }
    },

    removeMembers: (state: GroupsState, action: PayloadAction<GroupsWithMembersPayload>) => {
      const groupId = action.payload.groupId;
      const members = action.payload.members;
      const group = ArrayUtils.findValueById(state.groups, groupId) as Group;
      if (group) {
        const memberIds = members.map((m) => m.userId);
        group.members = group.members.filter((m) => !memberIds.includes(m.userId));
        state.groups = ArrayUtils.updateValueWithId(state.groups, group);
      }
    },

    addItem: (state: GroupsState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const oldItems = StoreUtils.getValue(state.items, item.groupId, []);
      const oldCount = StoreUtils.getValue(state.itemsCount, item.groupId, 0);
      const newItems = GroupUtils.filterItems([item, ...oldItems]);
      const newCount = oldCount + 1;
      state.items = StoreUtils.setValue(state.items, item.groupId, newItems);
      state.itemsCount = StoreUtils.setValue(state.itemsCount, item.groupId, newCount);
    },

    updateItem: (state: GroupsState, action: PayloadAction<Item>) => {
      const item = action.payload;
      if (!item.archived) {
        const oldItems = StoreUtils.getValue(state.items, item.groupId, []);
        const newItems = ArrayUtils.updateValueWithId(oldItems, item);
        state.items = StoreUtils.setValue(state.items, item.groupId, newItems);
      } else {
        const oldItems = StoreUtils.getValue(state.items, item.groupId, []);
        const newItems = ArrayUtils.deleteValueWithId(oldItems, item);
        state.items = StoreUtils.setValue(state.items, item.groupId, newItems);
      }
    },

    removeItem: (state: GroupsState, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const map = new Map(state.items);
      const itemArray = Array.from(map.values()).flatMap((items) => items);
      const item = ArrayUtils.findValueById(itemArray, itemId);
      if (item && !item.archived) {
        const oldItems = StoreUtils.getValue(state.items, item.groupId, []);
        const oldCount = StoreUtils.getValue(state.itemsCount, item.groupId, 0);
        const newItems = ArrayUtils.deleteValueWithId(oldItems, item);
        const newCount = oldCount - 1;
        state.items = StoreUtils.setValue(state.items, item.groupId, newItems);
        state.itemsCount = StoreUtils.setValue(state.itemsCount, item.groupId, newCount);
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
    refreshGroups
    */
    builder.addCase(GroupsActions.refreshGroupsThunk.pending, (state: GroupsState) => {
      state.loading = true;
    });
    builder.addCase(GroupsActions.refreshGroupsThunk.fulfilled, (state: GroupsState, action) => {
      state = initialState;
      state.groups = action.payload;
    });
    builder.addCase(GroupsActions.refreshGroupsThunk.rejected, (state: GroupsState) => {
      state.loading = false;
    });

    /*
    fetchItems
    */
    builder.addCase(GroupsActions.fetchItemsThunk.pending, (state: GroupsState, action) => {
      const groupIds = action.meta.arg;
      state.items = StoreUtils.setMultipleValues(state.items, groupIds, []);
      state.itemsCount = StoreUtils.setMultipleValues(state.itemsCount, groupIds, 0);
      state.itemsCollapsed = StoreUtils.setMultipleValues(state.itemsCollapsed, groupIds, false);
      state.itemsLoading = StoreUtils.setMultipleValues(state.itemsLoading, groupIds, true);
    });
    builder.addCase(GroupsActions.fetchItemsThunk.fulfilled, (state: GroupsState, action) => {
      const groupIds = action.meta.arg;
      const pageableListMap = new Map(Object.entries(action.payload));
      const itemFunc = (id: string): Item[] =>
        pageableListMap.has(id) ? pageableListMap.get(id).data.sort(ComparatorUtils.createdAtDescComparator) : [];
      const countFunc = (id: string): number => (pageableListMap.has(id) ? pageableListMap.get(id).count : 0);
      state.items = StoreUtils.setMultipleValuesFunc(state.items, groupIds, itemFunc);
      state.itemsCount = StoreUtils.setMultipleValuesFunc(state.itemsCount, groupIds, countFunc);
      state.itemsLoading = StoreUtils.setMultipleValues(state.itemsLoading, groupIds, false);
    });
    builder.addCase(GroupsActions.fetchItemsThunk.rejected, (state: GroupsState, action) => {
      const groupIds = action.meta.arg;
      state.itemsLoading = StoreUtils.setMultipleValues(state.itemsLoading, groupIds, false);
    });
  },
});

export default groupsSlice;
