import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {Item} from '../../models/Item';
import {Group} from '../../models/Group';

const getGroupState = (state: RootState) => state.group;
const getShowArchived = (_: any, showArchived: boolean) => showArchived;

class GroupSelectors {
  static group = createSelector(getGroupState, (state) => state.group as Group);

  static loading = createSelector(getGroupState, (state) => state.loading as boolean);

  static makeItemsCountSelector = () =>
    createSelector(
      [getGroupState, getShowArchived],
      (state, showArchived) => (showArchived ? state.archivedItemsCount : state.activeItemsCount) as number,
    );

  static makeItemsSelector = () =>
    createSelector(
      [getGroupState, getShowArchived],
      (state, showArchived) => (showArchived ? state.archivedItems : state.activeItems) as Item[],
    );

  static makeItemsLoadingSelector = () =>
    createSelector(
      [getGroupState, getShowArchived],
      (state, showArchived) => (showArchived ? state.archivedItemsLoading : state.activeItemsLoading) as boolean,
    );

  static makeAllItemsLoadedSelector = () =>
    createSelector(
      [getGroupState, getShowArchived],
      (state, showArchived) => (showArchived ? state.allArchivedItemsLoaded : state.allActiveItemsLoaded) as boolean,
    );
}

export default GroupSelectors;
