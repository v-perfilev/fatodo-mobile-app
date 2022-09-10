import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {Group} from '../../models/Group';
import {Item} from '../../models/Item';

const getGroupsState = (state: RootState) => state.groups;

class GroupsSelectors {
  static groups = createSelector(getGroupsState, (state) => state.groups as Group[]);

  static loading = createSelector(getGroupsState, (state) => state.loading as boolean);

  static items = createSelector(
    [getGroupsState, (state, groupId: string) => groupId],
    (state, groupId) => StoreUtils.getValue(state.items, groupId, []) as Item[],
  );

  static itemsCount = createSelector(
    [getGroupsState, (state, groupId: string) => groupId],
    (state, groupId) => StoreUtils.getValue(state.itemsCount, groupId, 0) as number,
  );

  static itemsCollapsed = createSelector(
    [getGroupsState, (state, groupId: string) => groupId],
    (state, groupId) => StoreUtils.getValue(state.itemsCollapsed, groupId, false) as boolean,
  );

  static itemsLoading = createSelector(
    [getGroupsState, (state, groupId: string) => groupId],
    (state, groupId) => StoreUtils.getValue(state.itemsLoading, groupId, false) as boolean,
  );

  static itemsAllLoading = createSelector(
    [getGroupsState, (state, groupId: string) => groupId],
    (state, groupId) => StoreUtils.getValue(state.itemsLoading, groupId, false) as boolean,
  );

  static itemsAllCollapsed = createSelector(
    getGroupsState,
    (state) => StoreUtils.reduceBoolean(state.itemsCollapsed) as boolean,
  );
}

export default GroupsSelectors;
