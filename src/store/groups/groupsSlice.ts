import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GroupsState} from './groupsType';
import GroupsThunks from './groupsThunks';
import {MapUtils} from '../../shared/utils/MapUtils';
import {Item} from '../../models/Item';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {Group} from '../../models/Group';

const filterItems = (items: Item[]): Item[] =>
  items.filter(ArrayUtils.withIdFilter).filter(ArrayUtils.uniqueByIdFilter).sort(ArrayUtils.createdAtDescComparator);

const initialState: GroupsState = {
  groups: [],
  loading: false,
  items: new Map(),
  itemsCollapsed: new Map(),
  itemsCounts: new Map(),
  itemsLoading: new Map(),
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state: GroupsState, action: PayloadAction<Group[]>) => ({
      ...state,
      groups: action.payload,
    }),
    setCollapsed: (state: GroupsState, action: PayloadAction<{id: string; value: boolean}>) => ({
      ...state,
      itemsCollapsed: MapUtils.setValue(state.itemsCollapsed, action.payload.id, action.payload.value),
    }),
    setAllCollapsed: (state: GroupsState, action: PayloadAction<boolean>) => ({
      ...state,
      itemsCollapsed: MapUtils.setAllValues(state.itemsCollapsed, action.payload),
    }),
  },
  extraReducers: (builder) => {
    /*
    fetchGroups
    */
    builder.addCase(GroupsThunks.fetchGroups.pending, () => ({
      ...initialState,
      loading: true,
    }));
    builder.addCase(GroupsThunks.fetchGroups.fulfilled, (state, action) => ({
      ...state,
      group: action.payload,
      loading: false,
    }));
    builder.addCase(GroupsThunks.fetchGroups.rejected, () => ({
      ...initialState,
      loading: false,
    }));

    /*
    fetchItems
    */
    builder.addCase(GroupsThunks.fetchItems.pending, (state, action) => {
      const groupIds = action.meta.arg;

      const items = MapUtils.setValues(new Map(), groupIds, []);
      const itemsCount = MapUtils.setValues(new Map(), groupIds, 0);
      const itemsCollapsed = MapUtils.setValues(new Map(), groupIds, false);
      const itemsLoading = MapUtils.setValues(new Map(), groupIds, true);

      return {...state, items, itemsCount, itemsCollapsed, itemsLoading};
    });
    builder.addCase(GroupsThunks.fetchItems.fulfilled, (state, action) => {
      const groupIds = action.meta.arg;
      const pageableListMap = action.payload;

      const arrayFunc = (id: string): Item[] => pageableListMap.get(id).data || [];
      const countFunc = (id: string): number => pageableListMap.get(id).count || 0;

      const items = MapUtils.setValuesFunc(state.items, groupIds, arrayFunc);
      const itemsCount = MapUtils.setValuesFunc(state.itemsCounts, groupIds, countFunc);
      const itemsLoading = MapUtils.setValues(state.itemsLoading, groupIds, false);

      return {...state, items, itemsCount, itemsLoading};
    });
    builder.addCase(GroupsThunks.fetchItems.rejected, () => ({
      ...initialState,
      loading: false,
    }));
    builder.addCase(GroupsThunks.fetchItems.rejected, (state, action) => {
      const groupIds = action.meta.arg;
      const itemsLoading = MapUtils.setValues(state.itemsLoading, groupIds, false);

      return {...state, itemsLoading};
    });

    /*
    fetchMoreItems
    */
    builder.addCase(GroupsThunks.fetchMoreItems.pending, (state, action) => {
      const groupId = action.meta.arg.groupId;
      const itemsLoading = MapUtils.setValue(new Map(), groupId, true);

      return {...state, itemsLoading};
    });
    builder.addCase(GroupsThunks.fetchMoreItems.fulfilled, (state, action) => {
      const groupId = action.meta.arg.groupId;
      const newItems = filterItems([...(state.items.get(groupId) || []), ...action.payload.data]);

      const items = MapUtils.setValue(state.itemsCounts, groupId, newItems);
      const itemsCount = MapUtils.setValue(state.itemsCounts, groupId, action.payload.count);
      const itemsLoading = MapUtils.setValue(new Map(), groupId, false);

      return {...state, items, itemsCount, itemsLoading};
    });
    builder.addCase(GroupsThunks.fetchMoreItems.rejected, (state, action) => {
      const groupId = action.meta.arg.groupId;
      const itemsLoading = MapUtils.setValue(new Map(), groupId, false);

      return {...state, itemsLoading};
    });

    /*
    deleteGroup
    */
    builder.addCase(GroupsThunks.deleteGroup.fulfilled, (state, action) => {
      const groupId = action.meta.arg;

      const groups = ArrayUtils.deleteValueById(state.groups, groupId);
      const items = MapUtils.deleteValue(state.items, groupId);
      const itemsCount = MapUtils.deleteValue(state.itemsCounts, groupId);
      const itemsCollapsed = MapUtils.deleteValue(state.itemsCollapsed, groupId);
      const itemsLoading = MapUtils.deleteValue(state.itemsLoading, groupId);

      return {...state, groups, items, itemsCount, itemsCollapsed, itemsLoading};
    });
  },
});

export default groupsSlice;
