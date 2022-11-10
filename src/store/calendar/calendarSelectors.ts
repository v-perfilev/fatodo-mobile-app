import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {CalendarReminder} from '../../models/Reminder';

const getCalendarState = (state: RootState) => state.calendar;
const getMonthKey = (_: any, monthKey: string) => monthKey;
const getSecondNumberParam = (_: any, param: number) => param;
const getThirdNumberParam = (_: any, __: any, param: number) => param;

class CalendarSelectors {
  static monthIndex = createSelector(getCalendarState, (state) => state.monthIndex as number);

  static weekIndex = createSelector(getCalendarState, (state) => state.weekIndex as number);

  static dayIndex = createSelector(getCalendarState, (state) => state.dayIndex as number);

  static dateIndex = createSelector(getCalendarState, (state) => state.dateIndex as number);

  static shouldLoad = createSelector(getCalendarState, (state) => state.shouldLoad as boolean);

  static makeIsActiveDateSelector = () =>
    createSelector([getCalendarState, getSecondNumberParam], (state, date) => (state.dateIndex === date) as boolean);

  static makeIsActiveWeekSelector = () =>
    createSelector([getCalendarState, getSecondNumberParam], (state, week) => (state.weekIndex === week) as boolean);

  static makeLoadingSelector = () =>
    createSelector([getCalendarState, getMonthKey], (state, key) => state.loadingKeys.includes(key) as boolean);

  static makeRemindersSelector = () =>
    createSelector([getCalendarState, getMonthKey, getThirdNumberParam], (state, monthKey, date) => {
      if (!date) {
        return undefined;
      }
      const reminders = StoreUtils.getValue(state.reminders, monthKey, []) as CalendarReminder[];
      return reminders.filter((r) => new Date(r.date).getDate() === date);
    });
}

export default CalendarSelectors;
