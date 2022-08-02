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
      state.group = action.payload;
    },

    addItem: (state: GroupState, action: PayloadAction<Item>) => {
      const item = action.payload;
      state.activeItems = GroupUtils.filterItems([...state.activeItems, item]);
      state.activeItemsCount = state.activeItemsCount + 1;
    },

    updateItem: (state: GroupState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const isArchived = item.archived;
      if (isArchived) {
        state.archivedItems = ArrayUtils.updateValueWithId(state.archivedItems, item);
      } else {
        state.activeItems = ArrayUtils.updateValueWithId(state.activeItems, item);
      }
    },

    updateItemArchived: (state: GroupState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const isArchived = item.archived;
      const activeFunction = !isArchived ? ArrayUtils.addValueToEnd : ArrayUtils.deleteValueWithId;
      const archivedFunction = isArchived ? ArrayUtils.addValueToEnd : ArrayUtils.deleteValueWithId;
      state.activeItems = GroupUtils.filterItems(activeFunction(state.activeItems, item));
      state.archivedItems = GroupUtils.filterItems(archivedFunction(state.archivedItems, item));
      state.activeItemsCount = state.activeItemsCount + (!isArchived ? 1 : -1);
      state.archivedItemsCount = state.archivedItemsCount + (isArchived ? 1 : -1);
    },

    updateItemStatus: (state: GroupState, action: PayloadAction<Item>) => {
      const item = action.payload;
      const isArchived = item.archived;
      if (isArchived) {
        state.archivedItems = ArrayUtils.updateValueWithId(state.archivedItems, item);
      } else {
        state.activeItems = ArrayUtils.updateValueWithId(state.activeItems, item);
      }
    },

    removeItem: (state: GroupState, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const itemArray = [...state.activeItems, ...state.archivedItems];
      const item = ArrayUtils.findValueById(itemArray, itemId);
      if (item) {
        const isArchived = item.archived;
        if (isArchived) {
          state.archivedItems = ArrayUtils.deleteValueWithId(state.archivedItems, item);
        } else {
          state.activeItems = ArrayUtils.deleteValueWithId(state.activeItems, item);
        }
        state.activeItemsCount = state.activeItemsCount + (!isArchived ? -1 : 0);
        state.archivedItemsCount = state.archivedItemsCount + (isArchived ? -1 : 0);
      }
    },
  },
  extraReducers: (builder) => {
    /*
    fetchGroup
    */
    builder.addCase(GroupThunks.fetchGroup.pending, () => {
      const loading = true;
      return {...initialState, loading};
    });
    builder.addCase(GroupThunks.fetchGroup.fulfilled, (state: GroupState, action) => {
      state.group = action.payload;
      state.loading = false;
    });
    builder.addCase(GroupThunks.fetchGroup.rejected, () => {
      return {...initialState};
    });

    /*
    fetchActiveItems
    */
    builder.addCase(GroupThunks.fetchActiveItems.pending, (state: GroupState) => {
      state.activeItemsLoading = true;
    });
    builder.addCase(GroupThunks.fetchActiveItems.fulfilled, (state: GroupState, action) => {
      state.activeItems = GroupUtils.filterItems([...state.activeItems, ...action.payload.data]);
      state.activeItemsCount = action.payload.count;
      state.activeItemsLoading = false;
    });
    builder.addCase(GroupThunks.fetchActiveItems.rejected, (state: GroupState) => {
      state.activeItemsLoading = false;
    });

    /*
    fetchArchivedItems
    */
    builder.addCase(GroupThunks.fetchArchivedItems.pending, (state: GroupState) => {
      state.archivedItemsLoading = true;
    });
    builder.addCase(GroupThunks.fetchArchivedItems.fulfilled, (state: GroupState, action) => {
      state.archivedItems = GroupUtils.filterItems([...state.archivedItems, ...action.payload.data]);
      state.archivedItemsCount = action.payload.count;
      state.archivedItemsLoading = false;
    });
    builder.addCase(GroupThunks.fetchArchivedItems.rejected, (state: GroupState) => {
      state.archivedItemsLoading = false;
    });

    /*
    createGroup
    */
    builder.addCase(GroupThunks.createGroup.pending, (state: GroupState) => {
      state.loading = true;
    });
    builder.addCase(GroupThunks.createGroup.fulfilled, (state: GroupState, action) => {
      state.group = action.payload;
      state.loading = false;
    });
    builder.addCase(GroupThunks.createGroup.rejected, () => {
      return {...initialState};
    });

    /*
    updateGroup
    */
    builder.addCase(GroupThunks.updateGroup.pending, (state: GroupState) => {
      state.loading = true;
    });
    builder.addCase(GroupThunks.updateGroup.fulfilled, (state: GroupState, action) => {
      state.group = action.payload;
      state.loading = false;
    });
    builder.addCase(GroupThunks.updateGroup.rejected, () => {
      return {...initialState};
    });
  },
});

export default groupSlice;
