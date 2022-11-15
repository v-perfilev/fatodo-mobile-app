import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {StoreUtils} from '../../shared/utils/StoreUtils';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarDate} from '../../models/Calendar';
import {CalendarUtils} from '../../shared/utils/CalendarUtils';

const getCalendarState = (state: RootState) => state.calendar;
const getCalendarDate = (_: any, date: CalendarDate) => date;

class CalendarSelectors {
  static shouldLoad = createSelector(getCalendarState, (state) => state.shouldLoad as boolean);

  static reminders = createSelector(
    getCalendarState,
    (state) => new Map(state.reminders) as Map<string, CalendarReminder[]>,
  );

  static makeDateRemindersSelector = () =>
    createSelector([getCalendarState, getCalendarDate], (state, date) => {
      const monthKey = CalendarUtils.buildMonthKeyByItem(date);
      const reminders = StoreUtils.getValue(state.reminders, monthKey, []) as CalendarReminder[];
      return reminders.filter((r) => new Date(r.date).getDate() === date.date) as CalendarReminder[];
    });
}

export default CalendarSelectors;
