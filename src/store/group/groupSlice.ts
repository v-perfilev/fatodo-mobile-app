import {createSlice} from '@reduxjs/toolkit';
import {GroupState} from './groupType';
import GroupThunks from './groupThunks';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {Item} from '../../models/Item';

const filterItems = (items: Item[]): Item[] => {
  return items
    .filter(ArrayUtils.withIdFilter)
    .filter(ArrayUtils.uniqueByIdFilter)
    .sort(ArrayUtils.createdAtDescComparator);
};

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
    createItem: (state: GroupState, action) => {
      const item = action.payload as Item;
      const activeItems = filterItems([...ArrayUtils.addValueToEnd(state.activeItems, item)]);
      const activeItemsCount = state.activeItemsCount + 1;
      return {...state, activeItems, activeItemsCount};
    },

    updateItem: (state: GroupState, action) => {
      const item = action.payload as Item;
      const isArchived = item.archived;
      const activeItems = !isArchived ? ArrayUtils.updateValue(state.activeItems, item) : state.activeItems;
      const archivedItems = isArchived ? ArrayUtils.updateValue(state.archivedItems, item) : state.activeItems;
      return {...state, activeItems, archivedItems};
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
      const activeItems = filterItems([...state.activeItems, ...action.payload.data]);
      return {...state, activeItemsCount, activeItems, activeItemsLoading: false};
    });
    builder.addCase(GroupThunks.fetchActiveItems.rejected, (state: GroupState) => ({
      ...state,
      activeItemsLoading: false,
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
      const archivedItems = filterItems([...state.archivedItems, ...action.payload.data]);
      return {...state, archivedItemsCount, archivedItems, archivedItemsLoading: false};
    });
    builder.addCase(GroupThunks.fetchArchivedItems.rejected, (state: GroupState) => ({
      ...state,
      archivedItemsLoading: false,
    }));

    /*
    updateItemArchived
    */
    builder.addCase(GroupThunks.updateItemArchived.fulfilled, (state: GroupState, action) => {
      const item = {...action.payload, archived: !action.meta.arg.archived} as Item;
      const isArchived = item.archived;
      const activeItemsCount = state.activeItemsCount + (!isArchived ? 1 : -1);
      const archivedItemsCount = state.archivedItemsCount + (isArchived ? 1 : -1);
      const activeFunction = !isArchived ? ArrayUtils.addValueToEnd : ArrayUtils.deleteValue;
      const archivedFunction = isArchived ? ArrayUtils.addValueToEnd : ArrayUtils.deleteValue;
      const activeItems = filterItems(activeFunction(state.activeItems, item));
      const archivedItems = filterItems(archivedFunction(state.activeItems, item));
      return {...state, activeItemsCount, archivedItemsCount, activeItems, archivedItems};
    });

    /*
    updateItemArchivedStatus
    */
    builder.addCase(GroupThunks.updateItemStatus.fulfilled, (state: GroupState, action) => {
      const item = {...action.meta.arg.item, status: action.meta.arg.status} as Item;
      const isArchived = item.archived;
      const activeItems = !isArchived ? ArrayUtils.updateValue(state.activeItems, item) : state.activeItems;
      const archivedItems = isArchived ? ArrayUtils.updateValue(state.archivedItems, item) : state.archivedItems;
      return {...state, activeItems, archivedItems};
    });

    /*
    removeItem
    */
    builder.addCase(GroupThunks.deleteItem.fulfilled, (state: GroupState, action) => {
      const item = action.meta.arg;
      const isArchived = item.archived;
      const activeItemsCount = state.activeItemsCount + (!isArchived ? -1 : 0);
      const archivedItemsCount = state.archivedItemsCount + (isArchived ? -1 : 0);
      const activeItems = !isArchived ? ArrayUtils.deleteValue(state.activeItems, item) : state.activeItems;
      const archivedItems = isArchived ? ArrayUtils.deleteValue(state.archivedItems, item) : state.archivedItems;
      return {...state, activeItemsCount, archivedItemsCount, activeItems, archivedItems};
    });

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

    /*
    addGroupMembers
    */
    builder.addCase(GroupThunks.addGroupMembers.fulfilled, (state: GroupState, action) => {
      const group = action.payload;
      return {...state, group};
    });

    /*
    editGroupMember
    */
    builder.addCase(GroupThunks.editGroupMember.fulfilled, (state: GroupState, action) => {
      const group = action.payload;
      return {...state, group};
    });

    /*
    removeGroupMembers
    */
    builder.addCase(GroupThunks.removeGroupMembers.fulfilled, (state: GroupState, action) => {
      const group = action.payload;
      return {...state, group};
    });
  },
});

export default groupSlice;
