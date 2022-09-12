import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {CalendarReminder} from '../../models/Reminder';

const getCalendarState = (state: RootState) => state.calendar;
const getMonthKey = (_: any, monthKey: string) => monthKey;
const getDate = (_: any, __: any, date: number) => date;

class CalendarSelectors {
  static loading = createSelector(getCalendarState, (state) => state.loading as boolean);

  static makeRemindersSelector = () =>
    createSelector([getCalendarState, getMonthKey, getDate], (state, monthKey, date) => {
      if (!date) {
        return undefined;
      }
      const reminders = StoreUtils.getValue(state.reminders, monthKey, []) as CalendarReminder[];
      return reminders.filter((r) => new Date(r.date).getDate() === date);
    });
}

export default CalendarSelectors;
