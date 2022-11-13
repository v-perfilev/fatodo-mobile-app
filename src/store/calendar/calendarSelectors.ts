import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarDate, CalendarMode} from '../../models/Calendar';
import {CalendarUtils} from '../../shared/utils/CalendarUtils';

const getCalendarState = (state: RootState) => state.calendar;
const getCalendarDate = (_: any, date: CalendarDate) => date;
const getIndex = (_: any, index: number) => index;

class CalendarSelectors {
  static mode = createSelector(getCalendarState, (state) => state.mode as CalendarMode);

  static monthIndex = createSelector(getCalendarState, (state) => state.monthIndex as number);

  static weekIndex = createSelector(getCalendarState, (state) => state.weekIndex as number);

  static dayIndex = createSelector(getCalendarState, (state) => state.dayIndex as number);

  static baseIndex = createSelector(getCalendarState, (state) => state.baseIndex as number);

  static monthBaseIndex = createSelector(getCalendarState, (state) => state.monthBaseIndex as number);

  static weekBaseIndex = createSelector(getCalendarState, (state) => state.weekBaseIndex as number);

  static shouldLoad = createSelector(getCalendarState, (state) => state.shouldLoad as boolean);

  static date = createSelector(
    getCalendarState,
    (state) => CalendarUtils.getCalendarDate(state.monthIndex, state.dateIndex) as CalendarDate,
  );

  static reminders = createSelector(
    getCalendarState,
    (state) => new Map(state.reminders) as Map<string, CalendarReminder[]>,
  );

  static makeIsActiveWeekSelector = () =>
    createSelector([getCalendarState, getIndex], (state, week) => (state.weekIndex === week) as boolean);

  static makeIsActiveDateSelector = () =>
    createSelector(
      [getCalendarState, getCalendarDate],
      (state, date) =>
        (state.dateIndex === date.date && state.monthIndex === CalendarUtils.getMonthIndexByItem(date)) as boolean,
    );

  static makeLoadingSelector = () =>
    createSelector([getCalendarState, getIndex], (state, index) => {
      const key = CalendarUtils.buildMonthKeyByIndex(index);
      return state.loadingKeys.includes(key) as boolean;
    });

  static makeDateRemindersSelector = () =>
    createSelector([getCalendarState, getCalendarDate], (state, date) => {
      const monthKey = CalendarUtils.buildMonthKeyByItem(date);
      const reminders = StoreUtils.getValue(state.reminders, monthKey, []) as CalendarReminder[];
      return reminders.filter((r) => new Date(r.date).getDate() === date.date);
    });

  static makeMonthRemindersSelector = () =>
    createSelector([getCalendarState, getIndex], (state, monthIndex) => {
      const monthKey = CalendarUtils.buildMonthKeyByIndex(monthIndex);
      return StoreUtils.getValue(state.reminders, monthKey, []) as CalendarReminder[];
    });
}

export default CalendarSelectors;
