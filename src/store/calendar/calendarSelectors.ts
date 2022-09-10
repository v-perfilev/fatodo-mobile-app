import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {CalendarReminder} from '../../models/Reminder';

const getCalendarState = (state: RootState) => state.calendar;

class CalendarSelectors {
  static reminders = createSelector(
    [getCalendarState, (state, key: string) => key],
    (state, key) => StoreUtils.getValue(state.reminders, key, []) as CalendarReminder[],
  );

  static loading = createSelector(getCalendarState, (state) => state.loading as boolean);
}

export default CalendarSelectors;
