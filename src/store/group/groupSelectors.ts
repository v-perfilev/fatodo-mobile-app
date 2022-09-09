import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getGroupState = (state: RootState) => state.group;

class GroupSelectors {
  static group = createSelector(getGroupState, (state) => state.group);

  static itemsCount = createSelector(
    [getGroupState, (state, showArchived: boolean) => showArchived],
    (state, showArchived) => (showArchived ? state.archivedItemsCount : state.activeItemsCount),
  );

  static items = createSelector(
    [getGroupState, (state, showArchived: boolean) => showArchived],
    (state, showArchived) => (showArchived ? state.archivedItems : state.activeItems),
  );

  static itemsLoading = createSelector(
    [getGroupState, (state, showArchived: boolean) => showArchived],
    (state, showArchived) => (showArchived ? state.archivedItemsLoading : state.activeItemsLoading),
  );

  static allItemsLoaded = createSelector(
    [getGroupState, (state, showArchived: boolean) => showArchived],
    (state, showArchived) => (showArchived ? state.allArchivedItemsLoaded : state.allActiveItemsLoaded),
  );

  static loading = createSelector(getGroupState, (state) => state.loading);
}

export default GroupSelectors;
