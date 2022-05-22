import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getGroupsState = (state: RootState) => state.groups;

class GroupsSelectors {
  static groups = createSelector(getGroupsState, (state) => state.groups);

  static loading = createSelector(getGroupsState, (state) => state.loading);

  static items = createSelector(getGroupsState, (state) => new Map(state.items));

  static itemsCount = createSelector(getGroupsState, (state) => new Map(state.itemsCount));

  static itemsCollapsed = createSelector(getGroupsState, (state) => new Map(state.itemsCollapsed));

  static itemsAllCollapsed = createSelector(getGroupsState, (state) =>
    Array.from(new Map(state.itemsCollapsed).values()).reduce((acc, val) => acc && val, true),
  );

  static itemsLoading = createSelector(getGroupsState, (state) => new Map(state.itemsLoading));
}

export default GroupsSelectors;
