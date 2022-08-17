import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getItemState = (state: RootState) => state.item;

class ItemSelectors {
  static item = createSelector(getItemState, (state) => state.item);

  static group = createSelector(getItemState, (state) => state.group);

  static reminders = createSelector(getItemState, (state) => state.reminders);

  static loading = createSelector(getItemState, (state) => state.loading);
}

export default ItemSelectors;
