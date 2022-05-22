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
  reducers: {},
  extraReducers: (builder) => {
    /*
    fetchGroup
    */
    builder.addCase(GroupThunks.fetchGroup.pending, () => ({
      ...initialState,
      loading: true,
    }));
    builder.addCase(GroupThunks.fetchGroup.fulfilled, (state, action) => ({
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
    builder.addCase(GroupThunks.fetchActiveItems.pending, (state) => ({
      ...state,
      activeItemsLoading: true,
    }));
    builder.addCase(GroupThunks.fetchActiveItems.fulfilled, (state, action) => {
      const activeItems = filterItems([...state.activeItems, ...action.payload.data]);
      return {
        ...state,
        activeItemsCount: action.payload.count,
        activeItems,
        activeItemsLoading: false,
      };
    });
    builder.addCase(GroupThunks.fetchActiveItems.rejected, (state) => ({
      ...state,
      activeItemsLoading: false,
    }));

    /*
    fetchArchivedItems
    */
    builder.addCase(GroupThunks.fetchArchivedItems.pending, (state) => ({
      ...state,
      archivedItemsLoading: true,
    }));
    builder.addCase(GroupThunks.fetchArchivedItems.fulfilled, (state, action) => {
      const archivedItems = filterItems([...state.archivedItems, ...action.payload.data]);
      return {
        ...state,
        archivedItemsCount: action.payload.count,
        archivedItems,
        archivedItemsLoading: false,
      };
    });
    builder.addCase(GroupThunks.fetchArchivedItems.rejected, (state) => ({
      ...state,
      archivedItemsLoading: false,
    }));

    /*
    updateItemArchived
    */
    builder.addCase(GroupThunks.updateItemArchived.fulfilled, (state, action) => {
      const item = {...action.payload, archived: !action.meta.arg.archived} as Item;
      const isArchived = item.archived;
      const activeItemsCount = state.activeItemsCount + (!isArchived ? 1 : -1);
      const archivedItemsCount = state.archivedItemsCount + (isArchived ? 1 : -1);

      const activeFunction = !isArchived ? ArrayUtils.addValue : ArrayUtils.deleteValue;
      const archivedFunction = isArchived ? ArrayUtils.addValue : ArrayUtils.deleteValue;
      const activeItems = filterItems(activeFunction(state.activeItems, item));
      const archivedItems = filterItems(archivedFunction(state.activeItems, item));

      return {
        ...state,
        activeItemsCount,
        archivedItemsCount,
        activeItems,
        archivedItems,
      };
    });

    /*
    updateItemArchivedStatus
    */
    builder.addCase(GroupThunks.updateItemStatus.fulfilled, (state, action) => {
      const item = {...action.meta.arg.item, status: action.meta.arg.status} as Item;
      const isArchived = item.archived;

      const activeItems = !isArchived ? ArrayUtils.updateValue(state.activeItems, item) : state.activeItems;
      const archivedItems = isArchived ? ArrayUtils.updateValue(state.archivedItems, item) : state.archivedItems;

      return {
        ...state,
        activeItems,
        archivedItems,
      };
    });

    /*
    removeItem
    */
    builder.addCase(GroupThunks.deleteItem.fulfilled, (state, action) => {
      const item = action.meta.arg;
      const isArchived = item.archived;

      const activeItemsCount = state.activeItemsCount + (!isArchived ? -1 : 0);
      const archivedItemsCount = state.archivedItemsCount + (isArchived ? -1 : 0);

      const activeItems = !isArchived ? ArrayUtils.deleteValue(state.activeItems, item) : state.activeItems;
      const archivedItems = isArchived ? ArrayUtils.deleteValue(state.archivedItems, item) : state.archivedItems;

      return {
        ...state,
        activeItemsCount,
        archivedItemsCount,
        activeItems,
        archivedItems,
      };
    });

    /*
    createGroup
    */
    builder.addCase(GroupThunks.createGroup.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(GroupThunks.createGroup.fulfilled, (state, action) => ({
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
    builder.addCase(GroupThunks.updateGroup.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(GroupThunks.updateGroup.fulfilled, (state, action) => ({
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
