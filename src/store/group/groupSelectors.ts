import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getGroupState = (state: RootState) => state.group;

class GroupSelectors {
  static groupSelector = createSelector(getGroupState, (state) => state.group);

  static activeItemsCountSelector = createSelector(getGroupState, (state) => state.activeItemsCount);

  static archivedItemsCountSelector = createSelector(getGroupState, (state) => state.archivedItemsCount);

  static activeItemsSelector = createSelector(getGroupState, (state) => state.activeItems);

  static archivedItemsSelector = createSelector(getGroupState, (state) => state.archivedItems);

  static loadingSelector = createSelector(getGroupState, (state) => state.loading);
}

export default GroupSelectors;
