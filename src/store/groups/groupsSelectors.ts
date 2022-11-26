import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {Group} from '../../models/Group';
import {Item} from '../../models/Item';

const getGroupsState = (state: RootState) => state.groups;
const getGroupId = (_: RootState, groupId: string) => groupId;

class GroupsSelectors {
  static groups = createSelector(getGroupsState, (state) => state.groups as Group[]);

  static itemsAllCollapsed = createSelector(
    getGroupsState,
    (state) => StoreUtils.reduceBoolean(state.itemsCollapsed) as boolean,
  );

  static makeItemsSelector = () =>
    createSelector(
      [getGroupsState, getGroupId],
      (state, groupId) => StoreUtils.getValue(state.items, groupId, []) as Item[],
    );

  static makeItemsCountSelector = () =>
    createSelector(
      [getGroupsState, getGroupId],
      (state, groupId) => StoreUtils.getValue(state.itemsCount, groupId, 0) as number,
    );

  static makeItemsCollapsedSelector = () =>
    createSelector(
      [getGroupsState, getGroupId],
      (state, groupId) => StoreUtils.getValue(state.itemsCollapsed, groupId, false) as boolean,
    );

  static makeItemsLoadingSelector = () =>
    createSelector(
      [getGroupsState, getGroupId],
      (state, groupId) => StoreUtils.getValue(state.itemsLoading, groupId, false) as boolean,
    );

  static groupsInitialized = createSelector(getGroupsState, (state) => state.groupsInitialized as boolean);
}

export default GroupsSelectors;
