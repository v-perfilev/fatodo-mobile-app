import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GroupState} from './groupType';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {Item} from '../../models/Item';
import {Group} from '../../models/Group';
import {GroupThunks} from './groupActions';
import {GroupUtils} from '../../shared/utils/GroupUtils';

const initialState: GroupState = {
  group: undefined,
  activeItemsCount: 0,
  archivedItemsCount: 0,
  activeItems: [],
  archivedItems: [],
  loading: false,
  activeItemsLoading: false,
  archivedItemsLoading: false,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroup: (state: GroupState, action: PayloadAction<Group>) => {
      const group = action.payload;
      return {...initialState, group};
    },

    updateGroup: (state: GroupState, action: PayloadAction<Group>) => {
      const group = action.payload;
      return {...state, group};
    },

    addItem: (state: GroupState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const activeItems = GroupUtils.filterItems([...state.activeItems, item]);
      const activeItemsCount = state.activeItemsCount + 1;
      return {...state, activeItems, activeItemsCount};
    },

    updateItem: (state: GroupState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const isArchived = item.archived;
      const activeItems = !isArchived ? ArrayUtils.updateValueWithId(state.activeItems, item) : state.activeItems;
      const archivedItems = isArchived ? ArrayUtils.updateValueWithId(state.archivedItems, item) : state.activeItems;
      return {...state, activeItems, archivedItems};
    },

    updateItemArchived: (state: GroupState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const isArchived = item.archived;
      const activeItemsCount = state.activeItemsCount + (!isArchived ? 1 : -1);
      const archivedItemsCount = state.archivedItemsCount + (isArchived ? 1 : -1);
      const activeFunction = !isArchived ? ArrayUtils.addValueToEnd : ArrayUtils.deleteValueWithId;
      const archivedFunction = isArchived ? ArrayUtils.addValueToEnd : ArrayUtils.deleteValueWithId;
      const activeItems = GroupUtils.filterItems(activeFunction(state.activeItems, item));
      const archivedItems = GroupUtils.filterItems(archivedFunction(state.archivedItems, item));
      return {...state, activeItemsCount, archivedItemsCount, activeItems, archivedItems};
    },

    updateItemStatus: (state: GroupState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const isArchived = item.archived;
      const activeItems = !isArchived ? ArrayUtils.updateValueWithId(state.activeItems, item) : state.activeItems;
      const archivedItems = isArchived ? ArrayUtils.updateValueWithId(state.archivedItems, item) : state.archivedItems;
      return {...state, activeItems, archivedItems};
    },

    removeItem: (state: GroupState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const isArchived = item.archived;
      const activeItemsCount = state.activeItemsCount + (!isArchived ? -1 : 0);
      const archivedItemsCount = state.archivedItemsCount + (isArchived ? -1 : 0);
      const activeItems = !isArchived ? ArrayUtils.deleteValueWithId(state.activeItems, item) : state.activeItems;
      const archivedItems = isArchived ? ArrayUtils.deleteValueWithId(state.archivedItems, item) : state.archivedItems;
      return {...state, activeItemsCount, archivedItemsCount, activeItems, archivedItems};
    },
  },
  extraReducers: (builder) => {
    /*
    fetchGroup
    */
    builder.addCase(GroupThunks.fetchGroup.pending, () => ({
      ...initialState,
      loading: true,
    }));
    builder.addCase(GroupThunks.fetchGroup.fulfilled, (state: GroupState, action) => ({
      ...state,
      group: action.payload,
      loading: false,
    }));
    builder.addCase(GroupThunks.fetchGroup.rejected, () => ({
      ...initialState,
      loading: false,
    }));

    /*
    fetchActiveItems
    */
    builder.addCase(GroupThunks.fetchActiveItems.pending, (state: GroupState) => ({
      ...state,
      activeItemsLoading: true,
    }));
    builder.addCase(GroupThunks.fetchActiveItems.fulfilled, (state: GroupState, action) => {
      const activeItemsCount = action.payload.count;
      const activeItems = GroupUtils.filterItems([...state.activeItems, ...action.payload.data]);
      return {...state, activeItemsCount, activeItems, activeItemsLoading: false};
    });
    builder.addCase(GroupThunks.fetchActiveItems.rejected, (state: GroupState) => ({
      ...state,
      activeItemsLoading: false,
    }));

    /*
    refreshActiveItems
    */
    builder.addCase(GroupThunks.refreshActiveItems.pending, (state: GroupState) => ({
      ...state,
      activeItems: [],
      activeItemsCount: 0,
    }));

    /*
    fetchArchivedItems
    */
    builder.addCase(GroupThunks.fetchArchivedItems.pending, (state: GroupState) => ({
      ...state,
      archivedItemsLoading: true,
    }));
    builder.addCase(GroupThunks.fetchArchivedItems.fulfilled, (state: GroupState, action) => {
      const archivedItemsCount = action.payload.count;
      const archivedItems = GroupUtils.filterItems([...state.archivedItems, ...action.payload.data]);
      return {...state, archivedItemsCount, archivedItems, archivedItemsLoading: false};
    });
    builder.addCase(GroupThunks.fetchArchivedItems.rejected, (state: GroupState) => ({
      ...state,
      archivedItemsLoading: false,
    }));

    /*
    refreshArchivedItems
    */
    builder.addCase(GroupThunks.refreshArchivedItems.pending, (state: GroupState) => ({
      ...state,
      archivedItems: [],
      archivedItemsCount: 0,
    }));

    /*
    createGroup
    */
    builder.addCase(GroupThunks.createGroup.pending, (state: GroupState) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(GroupThunks.createGroup.fulfilled, (state: GroupState, action) => ({
      ...state,
      group: action.payload,
      loading: false,
    }));
    builder.addCase(GroupThunks.createGroup.rejected, () => ({
      ...initialState,
      loading: false,
    }));

    /*
    updateGroup
    */
    builder.addCase(GroupThunks.updateGroup.pending, (state: GroupState) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(GroupThunks.updateGroup.fulfilled, (state: GroupState, action) => ({
      ...state,
      group: action.payload,
      loading: false,
    }));
    builder.addCase(GroupThunks.updateGroup.rejected, () => ({
      ...initialState,
      loading: false,
    }));
  },
});

export default groupSlice;
