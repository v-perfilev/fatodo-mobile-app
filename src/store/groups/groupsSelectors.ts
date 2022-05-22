import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getGroupsState = (state: RootState) => state.groups;

class GroupsSelectors {
  static groupsSelector = createSelector(getGroupsState, (state) => state.groups);

  static loadingSelector = createSelector(getGroupsState, (state) => state.loading);

  static itemsSelector = createSelector(getGroupsState, (state) => state.items);

  static itemsCountSelector = createSelector(getGroupsState, (state) => state.itemsCounts);

  static itemsCollapsedSelector = createSelector(getGroupsState, (state) => state.itemsCollapsed);

  static itemsAllCollapsedSelector = createSelector(getGroupsState, (state) =>
    Array.from(state.itemsCollapsed.values()).reduce((acc, val) => acc && val, true),
  );

  static itemsLoadingSelector = createSelector(getGroupsState, (state) => state.itemsLoading);
}

export default GroupsSelectors;
