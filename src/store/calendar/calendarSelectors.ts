import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarDate, CalendarEnrichedDate} from '../../models/Calendar';
import {CalendarUtils} from '../../shared/utils/CalendarUtils';

const getCalendarState = (state: RootState) => state.calendar;
const getCalendarDate = (_: any, date: CalendarDate) => date;

class CalendarSelectors {
  static date = createSelector(getCalendarState, (state) => state.date as CalendarEnrichedDate);

  static shouldLoad = createSelector(getCalendarState, (state) => state.shouldLoad as boolean);

  static reminders = createSelector(getCalendarState, (state) => state.reminders);

  static loading = createSelector(getCalendarState, (state) => (state.loadingKeys.length > 0) as boolean);

  static makeDateRemindersSelector = () =>
    createSelector([getCalendarState, getCalendarDate], (state, date) => {
      const monthKey = CalendarUtils.buildMonthKeyByItem(date);
      const reminders = StoreUtils.getValue(state.reminders, monthKey, []) as CalendarReminder[];
      return reminders.filter((r) => new Date(r.date).getDate() === date.date) as CalendarReminder[];
    });
}

export default CalendarSelectors;
