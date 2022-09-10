import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {Item} from '../../models/Item';
import {Group} from '../../models/Group';

const getGroupState = (state: RootState) => state.group;

class GroupSelectors {
  static group = createSelector(getGroupState, (state) => state.group as Group);

  static itemsCount = createSelector(
    [getGroupState, (state, showArchived: boolean) => showArchived],
    (state, showArchived) => (showArchived ? state.archivedItemsCount : state.activeItemsCount) as number,
  );

  static items = createSelector(
    [getGroupState, (state, showArchived: boolean) => showArchived],
    (state, showArchived) => (showArchived ? state.archivedItems : state.activeItems) as Item[],
  );

  static itemsLoading = createSelector(
    [getGroupState, (state, showArchived: boolean) => showArchived],
    (state, showArchived) => (showArchived ? state.archivedItemsLoading : state.activeItemsLoading) as boolean,
  );

  static allItemsLoaded = createSelector(
    [getGroupState, (state, showArchived: boolean) => showArchived],
    (state, showArchived) => (showArchived ? state.allArchivedItemsLoaded : state.allActiveItemsLoaded) as boolean,
  );

  static loading = createSelector(getGroupState, (state) => state.loading as boolean);
}

export default GroupSelectors;
