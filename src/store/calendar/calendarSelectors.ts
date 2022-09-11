import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {CalendarReminder} from '../../models/Reminder';

const getCalendarState = (state: RootState) => state.calendar;

class CalendarSelectors {
  static reminders = createSelector(
    [getCalendarState, (state, monthKey: string, date: number) => ({monthKey, date})],
    (state, {monthKey, date}) => {
      if (!date) {
        return undefined;
      }
      const reminders = StoreUtils.getValue(state.reminders, monthKey, []) as CalendarReminder[];
      return reminders.filter((r) => new Date(r.date).getDate() === date);
    },
  );

  static loading = createSelector(getCalendarState, (state) => state.loading as boolean);
}

export default CalendarSelectors;
