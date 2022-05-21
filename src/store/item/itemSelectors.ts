import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getItemState = (state: RootState) => state.item;

class ItemSelectors {
  static itemSelector = createSelector(getItemState, (state) => state.item);

  static remindersSelector = createSelector(getItemState, (state) => state.reminders);

  static loadingSelector = createSelector(getItemState, (state) => state.loading);
}

export default ItemSelectors;
