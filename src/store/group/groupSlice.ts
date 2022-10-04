import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GroupState} from './groupType';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {Item} from '../../models/Item';
import {Group} from '../../models/Group';
import {GroupActions} from './groupActions';
import {FilterUtils} from '../../shared/utils/FilterUtils';
import {ComparatorUtils} from '../../shared/utils/ComparatorUtils';

const initialState: GroupState = {
  group: undefined,
  activeItems: [],
  archivedItems: [],
  allActiveItemsLoaded: false,
  allArchivedItemsLoaded: false,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    reset: (state: GroupState) => {
      Object.assign(state, initialState);
    },

    setGroup: (state: GroupState, action: PayloadAction<Group>) => {
      if (!state.group || state.group.id === action.payload.id) {
        state.group = action.payload;
      }
    },

    resetActiveItems: (state: GroupState) => {
      state.activeItems = [];
    },

    setActiveItems: (state: GroupState, action: PayloadAction<Item[]>) => {
      state.activeItems = filterItems([...action.payload, ...state.activeItems]);
    },

    resetArchivedItems: (state: GroupState) => {
      state.archivedItems = [];
    },

    setArchivedItems: (state: GroupState, action: PayloadAction<Item[]>) => {
      state.archivedItems = filterItems([...action.payload, ...state.archivedItems]);
    },

    setItem: (state: GroupState, action: PayloadAction<Item>) => {
      const groupId = action.payload.groupId;
      const isArchived = action.payload.archived;
      if (state.group?.id === groupId) {
        if (isArchived) {
          state.archivedItems = filterItems([action.payload, ...state.archivedItems]);
        } else {
          state.activeItems = filterItems([action.payload, ...state.activeItems]);
        }
      }
    },

    updateItemArchived: (state: GroupState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const isArchived = item.archived;
      if (state.group?.id === item.groupId) {
        const addValueToEnd = (array: Item[], value: Item): Item[] => [...array, value];
        const activeFunction = !isArchived ? addValueToEnd : ArrayUtils.deleteValueWithId;
        const archivedFunction = isArchived ? addValueToEnd : ArrayUtils.deleteValueWithId;
        state.activeItems = filterItems(activeFunction(state.activeItems, item));
        state.archivedItems = filterItems(archivedFunction(state.archivedItems, item));
      }
    },

    removeItem: (state: GroupState, action: PayloadAction<string>) => {
      const item = [...state.activeItems, ...state.archivedItems].find((i) => i.id === action.payload);
      if (item && state.group.id === item.groupId) {
        const isArchived = item.archived;
        if (isArchived) {
          state.archivedItems = ArrayUtils.deleteValueWithId(state.archivedItems, item);
        } else {
          state.activeItems = ArrayUtils.deleteValueWithId(state.activeItems, item);
        }
      }
    },

    calculateAllActiveLoaded: (state: GroupState, action: PayloadAction<number>) => {
      state.allActiveItemsLoaded = state.activeItems.length === action.payload;
    },

    calculateAllArchivedLoaded: (state: GroupState, action: PayloadAction<number>) => {
      state.allArchivedItemsLoaded = state.archivedItems.length === action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchGroup
    */
    builder.addCase(GroupActions.fetchGroupThunk.pending, (state) => {
      groupSlice.caseReducers.reset(state);
    });
    builder.addCase(GroupActions.fetchGroupThunk.fulfilled, (state, action) => {
      groupSlice.caseReducers.setGroup(state, action);
    });

    /*
    fetchActiveItems
    */
    builder.addCase(GroupActions.fetchActiveItemsThunk.fulfilled, (state, action) => {
      groupSlice.caseReducers.setActiveItems(state, {...action, payload: action.payload.data});
      groupSlice.caseReducers.calculateAllActiveLoaded(state, {...action, payload: action.payload.count});
    });

    /*
    refreshActiveItems
    */
    builder.addCase(GroupActions.refreshActiveItemsThunk.fulfilled, (state, action) => {
      groupSlice.caseReducers.resetActiveItems(state);
      groupSlice.caseReducers.setActiveItems(state, {...action, payload: action.payload.data});
      groupSlice.caseReducers.calculateAllActiveLoaded(state, {...action, payload: action.payload.count});
    });

    /*
    fetchArchivedItems
    */
    builder.addCase(GroupActions.fetchArchivedItemsThunk.fulfilled, (state, action) => {
      groupSlice.caseReducers.setArchivedItems(state, {...action, payload: action.payload.data});
      groupSlice.caseReducers.calculateAllArchivedLoaded(state, {...action, payload: action.payload.count});
    });

    /*
    refreshArchivedItems
    */
    builder.addCase(GroupActions.refreshArchivedItemsThunk.fulfilled, (state, action) => {
      groupSlice.caseReducers.resetArchivedItems(state);
      groupSlice.caseReducers.setArchivedItems(state, {...action, payload: action.payload.data});
      groupSlice.caseReducers.calculateAllArchivedLoaded(state, {...action, payload: action.payload.count});
    });

    /*
    updateItemArchived
    */
    builder.addCase(GroupActions.updateItemArchivedThunk.fulfilled, (state, action) => {
      groupSlice.caseReducers.updateItemArchived(state, action);
    });

    /*
    removeItem
    */
    builder.addCase(GroupActions.removeItemThunk.fulfilled, (state, action) => {
      groupSlice.caseReducers.removeItem(state, action);
    });

    /*
    createGroup
    */
    builder.addCase(GroupActions.createGroupThunk.pending, (state) => {
      groupSlice.caseReducers.reset(state);
    });
    builder.addCase(GroupActions.createGroupThunk.fulfilled, (state, action) => {
      groupSlice.caseReducers.setGroup(state, action);
    });

    /*
    updateGroup
    */
    builder.addCase(GroupActions.updateGroupThunk.fulfilled, (state, action) => {
      groupSlice.caseReducers.setGroup(state, action);
    });

    /*
    addGroupMembers
    */
    builder.addCase(GroupActions.addGroupMembersThunk.fulfilled, (state, action) => {
      groupSlice.caseReducers.setGroup(state, action);
    });

    /*
    editGroupMembers
    */
    builder.addCase(GroupActions.editGroupMemberThunk.fulfilled, (state, action) => {
      groupSlice.caseReducers.setGroup(state, action);
    });

    /*
    removeGroupMembers
    */
    builder.addCase(GroupActions.removeGroupMembersThunk.fulfilled, (state, action) => {
      groupSlice.caseReducers.setGroup(state, action);
    });
  },
});

const filterItems = (items: Item[]): Item[] => {
  return items
    .filter(FilterUtils.withIdFilter)
    .filter(FilterUtils.uniqueByIdFilter)
    .sort(ComparatorUtils.createdAtDescComparator);
};

export default groupSlice;
