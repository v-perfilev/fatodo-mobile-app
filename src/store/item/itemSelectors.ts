import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {Item} from '../../models/Item';
import {Group} from '../../models/Group';
import {Reminder} from '../../models/Reminder';

const getItemState = (state: RootState) => state.item;

class ItemSelectors {
  static item = createSelector(getItemState, (state) => state.item as Item);

  static group = createSelector(getItemState, (state) => state.group as Group);

  static reminders = createSelector(getItemState, (state) => state.reminders as Reminder[]);
}

export default ItemSelectors;
