import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GroupsState} from './groupsType';
import {Item} from '../../models/Item';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {Group, GroupMember} from '../../models/Group';
import {GroupsActions} from './groupsActions';
import {ComparatorUtils} from '../../shared/utils/ComparatorUtils';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {FilterUtils} from '../../shared/utils/FilterUtils';

const initialState: GroupsState = {
  groups: [],
  cachedGroups: [],
  items: [],
  itemsCount: [],
  itemsLoading: [],
  itemsCollapsed: [],
  groupsInitialized: false,
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    reset: (state: GroupsState) => {
      Object.assign(state, initialState);
    },

    cacheGroups: (state: GroupsState) => {
      state.cachedGroups = state.groups;
    },

    resetGroupsFromCache: (state: GroupsState) => {
      state.groups = state.cachedGroups;
      state.cachedGroups = [];
    },

    setGroups: (state: GroupsState, action: PayloadAction<Group[]>) => {
      state.groups = filterGroups(action.payload);
    },

    addGroup: (state: GroupsState, action: PayloadAction<Group>) => {
      state.groups = filterGroups([...state.groups, action.payload]);
    },

    updateGroup: (state: GroupsState, action: PayloadAction<Group>) => {
      const group = action.payload;
      state.groups = ArrayUtils.updateValueWithId(state.groups, group);
    },

    removeGroup: (state: GroupsState, action: PayloadAction<string>) => {
      const groupId = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        state.groups = ArrayUtils.deleteValueWithId(state.groups, group);
      }
    },

    setMembers: (state: GroupsState, action: PayloadAction<GroupMember[]>) => {
      const members = action.payload;
      const groupId = members.length > 0 && members[0].groupId;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        group.members = filterMembers([...members, ...group.members]);
        state.groups = ArrayUtils.updateValueWithId(state.groups, group);
      }
    },

    removeMembers: (state: GroupsState, action: PayloadAction<GroupMember[]>) => {
      const members = action.payload;
      const groupId = members.length > 0 && members[0].groupId;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        const memberIds = members.map((m) => m.userId);
        group.members = group.members.filter((m) => !memberIds.includes(m.userId));
        state.groups = ArrayUtils.updateValueWithId(state.groups, group);
      }
    },

    addItem: (state: GroupsState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const oldItems = StoreUtils.getValue(state.items, item.groupId, []);
      const newItems = filterItems([item, ...oldItems]);
      state.items = StoreUtils.setValue(state.items, item.groupId, newItems);
    },

    updateItem: (state: GroupsState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const items = StoreUtils.getValue(state.items, item.groupId, []);
      const updatedItems = ArrayUtils.updateValueWithId(items, item);
      state.items = StoreUtils.setValue(state.items, item.groupId, updatedItems);
    },

    removeItem: (state: GroupsState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const items = StoreUtils.getValue(state.items, item.groupId, []);
      const updatedItems = ArrayUtils.deleteValueWithId(items, item);
      state.items = StoreUtils.setValue(state.items, item.groupId, updatedItems);
    },

    setItems: (state: GroupsState, action: PayloadAction<[string, Item[]][]>) => {
      const map = new Map(action.payload);
      const groupIds = Array.from(map.keys());
      const itemsFunc = (id: string): Item[] => map.get(id);
      state.items = StoreUtils.setMultipleValuesFunc(state.items, groupIds, itemsFunc);
    },

    removeItems: (state: GroupsState, action: PayloadAction<string>) => {
      state.items = StoreUtils.deleteValue(state.items, action.payload);
    },

    setItemsCount: (state: GroupsState, action: PayloadAction<[string, number][]>) => {
      const map = new Map(action.payload);
      const groupIds = Array.from(map.keys());
      const countFunc = (id: string): number => map.get(id);
      state.itemsCount = StoreUtils.setMultipleValuesFunc(state.itemsCount, groupIds, countFunc);
    },

    incrementItemsCount: (state: GroupsState, action: PayloadAction<string>) => {
      const count = StoreUtils.getValue(state.itemsCount, action.payload, 0);
      state.itemsCount = StoreUtils.setValue(state.itemsCount, action.payload, count + 1);
    },

    decrementItemsCount: (state: GroupsState, action: PayloadAction<string>) => {
      const count = StoreUtils.getValue(state.itemsCount, action.payload, 0);
      state.itemsCount = StoreUtils.setValue(state.itemsCount, action.payload, count - 1);
    },

    removeItemsCount: (state: GroupsState, action: PayloadAction<string>) => {
      state.itemsCount = StoreUtils.deleteValue(state.itemsCount, action.payload);
    },

    setItemsLoading: (state: GroupsState, action: PayloadAction<[string, boolean][]>) => {
      const map = new Map(action.payload);
      const groupIds = Array.from(map.keys());
      const loadingFunc = (id: string): boolean => map.get(id);
      state.itemsLoading = StoreUtils.setMultipleValuesFunc(state.itemsLoading, groupIds, loadingFunc);
    },

    removeItemsLoading: (state: GroupsState, action: PayloadAction<string>) => {
      state.itemsLoading = StoreUtils.deleteValue(state.itemsLoading, action.payload);
    },

    initializeCollapsed: (state: GroupsState, action: PayloadAction<string[]>) => {
      state.itemsCollapsed = StoreUtils.setMultipleValues(state.itemsCollapsed, action.payload, false);
    },

    setCollapsed: (state: GroupsState, action: PayloadAction<[string, boolean]>) => {
      state.itemsCollapsed = StoreUtils.setValue(state.itemsCollapsed, action.payload[0], action.payload[1]);
    },

    setAllCollapsed: (state: GroupsState, action: PayloadAction<boolean>) => {
      state.itemsCollapsed = StoreUtils.setAllValues(state.itemsCollapsed, action.payload);
    },

    removeCollapsed: (state: GroupsState, action: PayloadAction<string>) => {
      state.itemsCollapsed = StoreUtils.deleteValue(state.itemsCollapsed, action.payload);
    },

    setGroupsInitialized: (state: GroupsState, action: PayloadAction<boolean>) => {
      state.groupsInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchGroup
    */
    builder.addCase(GroupsActions.fetchGroupThunk.fulfilled, (state, action) => {
      const groupId = action.payload.id;
      groupsSlice.caseReducers.setGroups(state, {...action, payload: [action.payload]});
      groupsSlice.caseReducers.initializeCollapsed(state, {...action, payload: [groupId]});
    });

    /*
    fetchGroups
    */
    builder.addCase(GroupsActions.fetchGroupsThunk.fulfilled, (state, action) => {
      const groupIds = action.payload.map((g) => g.id);
      groupsSlice.caseReducers.setGroups(state, action);
      groupsSlice.caseReducers.initializeCollapsed(state, {...action, payload: groupIds});
      groupsSlice.caseReducers.setGroupsInitialized(state, {...action, payload: true});
    });

    /*
    fetchItems
    */
    builder.addCase(GroupsActions.fetchItemsThunk.pending, (state: GroupsState, action) => {
      const loadingMap: [string, boolean][] = action.meta.arg.map((groupId) => [groupId, true]);
      groupsSlice.caseReducers.setItemsLoading(state, {...action, payload: loadingMap});
    });
    builder.addCase(GroupsActions.fetchItemsThunk.fulfilled, (state: GroupsState, action) => {
      const itemsMap: [string, Item[]][] = action.payload.map((entry) => [entry[0], entry[1].data]);
      groupsSlice.caseReducers.setItems(state, {...action, payload: itemsMap});
      const countMap: [string, number][] = action.payload.map((entry) => [entry[0], entry[1].count]);
      groupsSlice.caseReducers.setItemsCount(state, {...action, payload: countMap});
      const loadingMap: [string, boolean][] = action.meta.arg.map((groupId) => [groupId, false]);
      groupsSlice.caseReducers.setItemsLoading(state, {...action, payload: loadingMap});
    });
    builder.addCase(GroupsActions.fetchItemsThunk.rejected, (state: GroupsState, action) => {
      const loadingMap: [string, boolean][] = action.meta.arg.map((groupId) => [groupId, false]);
      groupsSlice.caseReducers.setItemsLoading(state, {...action, payload: loadingMap});
    });

    /*
    removeGroup
    */
    builder.addCase(GroupsActions.removeGroupThunk.fulfilled, (state, action) => {
      groupsSlice.caseReducers.removeGroup(state, action);
      groupsSlice.caseReducers.removeItems(state, action);
      groupsSlice.caseReducers.removeItemsCount(state, action);
      groupsSlice.caseReducers.removeItemsLoading(state, action);
      groupsSlice.caseReducers.removeCollapsed(state, action);
    });

    /*
    leaveGroup
    */
    builder.addCase(GroupsActions.leaveGroupThunk.fulfilled, (state, action) => {
      groupsSlice.caseReducers.removeGroup(state, action);
      groupsSlice.caseReducers.removeItems(state, action);
      groupsSlice.caseReducers.removeItemsCount(state, action);
      groupsSlice.caseReducers.removeItemsLoading(state, action);
      groupsSlice.caseReducers.removeCollapsed(state, action);
    });
  },
});

const filterGroups = (groups: Group[]): Group[] => {
  return groups.filter(FilterUtils.uniqueByIdFilter);
};

const filterMembers = (members: GroupMember[]): GroupMember[] => {
  return members.filter(FilterUtils.uniqueByUserIdFilter);
};

const filterItems = (items: Item[]): Item[] => {
  return items.filter(FilterUtils.uniqueByIdFilter).sort(ComparatorUtils.createdAtDescComparator);
};

export default groupsSlice;
