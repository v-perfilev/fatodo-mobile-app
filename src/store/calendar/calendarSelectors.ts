import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarDate, CalendarMode} from '../../models/Calendar';
import {CalendarUtils} from '../../shared/utils/CalendarUtils';

const getCalendarState = (state: RootState) => state.calendar;
const getMonthKey = (_: any, monthKey: string) => monthKey;
const getCalendarDate = (_: any, date: CalendarDate) => date;
const getWeekIndex = (_: any, weekIndex: number) => weekIndex;
const getDateIndex = (_: any, __: any, param: number) => param;

class CalendarSelectors {
  static mode = createSelector(getCalendarState, (state) => state.mode as CalendarMode);

  static monthIndex = createSelector(getCalendarState, (state) => state.monthIndex as number);

  static weekIndex = createSelector(getCalendarState, (state) => state.weekIndex as number);

  static dayIndex = createSelector(getCalendarState, (state) => state.dayIndex as number);

  static dateIndex = createSelector(getCalendarState, (state) => state.dateIndex as number);

  static baseIndex = createSelector(getCalendarState, (state) => state.baseIndex as number);

  static monthBaseIndex = createSelector(getCalendarState, (state) => state.monthBaseIndex as number);

  static weekBaseIndex = createSelector(getCalendarState, (state) => state.weekBaseIndex as number);

  static shouldLoad = createSelector(getCalendarState, (state) => state.shouldLoad as boolean);

  static makeIsActiveWeekSelector = () =>
    createSelector([getCalendarState, getWeekIndex], (state, week) => (state.weekIndex === week) as boolean);

  static makeIsActiveDateSelector = () =>
    createSelector(
      [getCalendarState, getCalendarDate],
      (state, date) =>
        (state.dateIndex === date.date && state.monthIndex === CalendarUtils.getMonthIndexByMonth(date)) as boolean,
    );

  static makeLoadingSelector = () =>
    createSelector([getCalendarState, getMonthKey], (state, key) => state.loadingKeys.includes(key) as boolean);

  static makeRemindersSelector = () =>
    createSelector([getCalendarState, getMonthKey, getDateIndex], (state, monthKey, date) => {
      const reminders = StoreUtils.getValue(state.reminders, monthKey, []) as CalendarReminder[];
      return reminders.filter((r) => new Date(r.date).getDate() === date);
    });
}

export default CalendarSelectors;
