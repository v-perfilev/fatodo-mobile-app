import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getGroupState = (state: RootState) => state.group;

class GroupSelectors {
  static group = createSelector(getGroupState, (state) => state.group);

  static activeItemsCount = createSelector(getGroupState, (state) => state.activeItemsCount);

  static archivedItemsCount = createSelector(getGroupState, (state) => state.archivedItemsCount);

  static activeItems = createSelector(getGroupState, (state) => state.activeItems);

  static archivedItems = createSelector(getGroupState, (state) => state.archivedItems);

  static loading = createSelector(getGroupState, (state) => state.loading);

  static activeItemsLoading = createSelector(getGroupState, (state) => state.activeItemsLoading);

  static archivedItemsLoading = createSelector(getGroupState, (state) => state.archivedItemsLoading);

  static allActiveItemsLoaded = createSelector(getGroupState, (state) => state.allActiveItemsLoaded);

  static allArchivedItemsLoaded = createSelector(getGroupState, (state) => state.allArchivedItemsLoaded);
}

export default GroupSelectors;
