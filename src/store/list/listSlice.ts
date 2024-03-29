import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ListState} from './listType';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {Item} from '../../models/Item';
import {ListActions} from './listActions';
import {FilterUtils} from '../../shared/utils/FilterUtils';
import {ComparatorUtils} from '../../shared/utils/ComparatorUtils';
import {Group, GroupMember} from '../../models/Group';

const initialState: ListState = {
  groups: [],
  items: [],
  allItemsLoaded: false,
  listInitialized: false,
  shouldLoad: true,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    reset: (state: ListState) => {
      Object.assign(state, initialState);
    },

    resetItems: (state: ListState) => {
      state.items = [];
    },

    setGroups: (state: ListState, action: PayloadAction<Group[]>) => {
      state.groups = filterGroups(action.payload);
    },

    addGroup: (state: ListState, action: PayloadAction<Group>) => {
      state.groups = filterGroups([...state.groups, action.payload]);
    },

    updateGroup: (state: ListState, action: PayloadAction<Group>) => {
      const group = action.payload;
      state.groups = ArrayUtils.updateValueWithId(state.groups, group);
    },

    removeGroup: (state: ListState, action: PayloadAction<string>) => {
      const groupId = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        state.groups = ArrayUtils.deleteValueWithId(state.groups, group);
      }
    },

    setItems: (state: ListState, action: PayloadAction<Item[]>) => {
      state.items = filterItems([...action.payload, ...state.items]);
    },

    setItem: (state: ListState, action: PayloadAction<Item>) => {
      state.items = filterItems([action.payload, ...state.items]);
    },

    removeItem: (state: ListState, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        state.items = ArrayUtils.deleteValueWithId(state.items, item);
      }
    },

    removeItems: (state: ListState, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.groupId !== action.payload);
    },

    setMembers: (state: ListState, action: PayloadAction<GroupMember[]>) => {
      const members = action.payload;
      const groupId = members.length > 0 && members[0].groupId;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        group.members = filterMembers([...members, ...group.members]);
        state.groups = ArrayUtils.updateValueWithId(state.groups, group);
      }
    },

    calculateAllLoaded: (state: ListState, action: PayloadAction<number>) => {
      state.allItemsLoaded = state.items.length === action.payload;
    },

    setListInitialized: (state: ListState, action: PayloadAction<boolean>) => {
      state.listInitialized = action.payload;
    },

    setShouldLoad: (state: ListState, action: PayloadAction<boolean>) => {
      state.shouldLoad = action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchGroup
    */
    builder.addCase(ListActions.fetchGroupThunk.fulfilled, (state, action) => {
      listSlice.caseReducers.addGroup(state, action);
      listSlice.caseReducers.setShouldLoad(state, {...action, payload: true});
    });

    /*
    fetchGroups
    */
    builder.addCase(ListActions.fetchGroupsThunk.fulfilled, (state, action) => {
      listSlice.caseReducers.setGroups(state, action);
    });

    /*
    fetchItems
    */
    builder.addCase(ListActions.fetchItemsThunk.fulfilled, (state, action) => {
      listSlice.caseReducers.setItems(state, {...action, payload: action.payload.data});
      listSlice.caseReducers.calculateAllLoaded(state, {...action, payload: action.payload.count});
      listSlice.caseReducers.setListInitialized(state, {...action, payload: true});
      listSlice.caseReducers.setShouldLoad(state, {...action, payload: false});
    });

    /*
    refreshItems
    */
    builder.addCase(ListActions.refreshItemsThunk.fulfilled, (state, action) => {
      listSlice.caseReducers.resetItems(state);
      listSlice.caseReducers.setItems(state, {...action, payload: action.payload.data});
      listSlice.caseReducers.calculateAllLoaded(state, {...action, payload: action.payload.count});
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
  return items
    .filter(FilterUtils.withIdFilter)
    .filter(FilterUtils.uniqueByIdFilter)
    .filter(FilterUtils.notArchivedFilter)
    .sort(ComparatorUtils.itemsComparator);
};

export default listSlice;
