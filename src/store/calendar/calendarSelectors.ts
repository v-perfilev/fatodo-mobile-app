import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarDate, CalendarMode} from '../../models/Calendar';
import {CalendarUtils} from '../../shared/utils/CalendarUtils';

const getCalendarState = (state: RootState) => state.calendar;
const getCalendarDate = (_: any, date: CalendarDate) => date;

class CalendarSelectors {
  /*
  Control
   */

  static mode = createSelector(getCalendarState, (state) => state.mode as CalendarMode);

  static baseIndex = createSelector(getCalendarState, (state) => state.controlIndex as number);

  static monthBaseIndex = createSelector(getCalendarState, (state) => state.monthControlIndex as number);

  static weekBaseIndex = createSelector(getCalendarState, (state) => state.weekControlIndex as number);

  /*
  Common
   */

  static monthIndex = createSelector(getCalendarState, (state) => state.monthIndex as number);

  static weekIndex = createSelector(getCalendarState, (state) => state.weekIndex as number);

  static dateIndex = createSelector(getCalendarState, (state) => state.dateIndex as number);

  static shouldLoad = createSelector(getCalendarState, (state) => state.shouldLoad as boolean);

  static loading = createSelector(getCalendarState, (state) => {
    if (state.loadingKeys.length === 0) {
      return false;
    }
    const month = CalendarUtils.getMonthByMonthIndex(state.monthIndex);
    const key = CalendarUtils.buildMonthKeyByItem(month);
    return state.loadingKeys.includes(key) as boolean;
  });

  static reminders = createSelector(
    getCalendarState,
    (state) => new Map(state.reminders) as Map<string, CalendarReminder[]>,
  );

  /*
  Other
   */

  static makeIsActiveDateSelector = () =>
    createSelector(
      [getCalendarState, getCalendarDate],
      (state, date) => (state.dateIndex === CalendarUtils.getDateIndexByDate(date)) as boolean,
    );

  static makeDateRemindersSelector = () =>
    createSelector([getCalendarState, getCalendarDate], (state, date) => {
      const monthKey = CalendarUtils.buildMonthKeyByItem(date);
      const reminders = StoreUtils.getValue(state.reminders, monthKey, []) as CalendarReminder[];
      return reminders.filter((r) => new Date(r.date).getDate() === date.date) as CalendarReminder[];
    });
}

export default CalendarSelectors;
