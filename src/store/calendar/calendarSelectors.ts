import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const getCalendarState = (state: RootState) => state.calendar;

class CalendarSelectors {
  static hasReminders = createSelector(
    [getCalendarState, (state, key: string) => key],
    (state, key) => new Map(state.reminders).get(key) !== undefined,
  );

  static reminders = createSelector(
    [getCalendarState, (state, key: string) => key],
    (state, key) => new Map(state.reminders).get(key) || [],
  );

  static loading = createSelector(getCalendarState, (state) => state.loading);
}

export default CalendarSelectors;
