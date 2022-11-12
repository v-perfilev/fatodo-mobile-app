import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, AsyncThunkConfig} from '../store';
import NotificationService from '../../services/NotificationService';
import {InfoActions} from '../info/infoActions';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarUtils} from '../../shared/utils/CalendarUtils';
import {CalendarDate, CalendarMode, CalendarMonth} from '../../models/Calendar';
import {CALENDAR_LOAD_INDENT} from '../../constants';
import calendarSlice from './calendarSlice';

const PREFIX = 'calendar/';

export class CalendarActions {
  static reset = () => (dispatch: AppDispatch) => {
    dispatch(calendarSlice.actions.reset());
  };

  static setMode = (mode: CalendarMode) => (dispatch: AppDispatch) => {
    dispatch(calendarSlice.actions.setMode(mode));
  };

  static selectDate = (date: CalendarDate) => (dispatch: AppDispatch) => {
    dispatch(calendarSlice.actions.setDateIndex(date));
  };

  static selectMonth = (monthIndex: number) => (dispatch: AppDispatch) => {
    dispatch(calendarSlice.actions.setMonthIndex(monthIndex));
  };

  static selectMonthByBaseIndex = (baseIndex: number) => (dispatch: AppDispatch) => {
    dispatch(calendarSlice.actions.setMonthIndexByBaseIndex(baseIndex));
  };

  static selectWeek = (weekIndex: number) => (dispatch: AppDispatch) => {
    dispatch(calendarSlice.actions.setWeekIndex(weekIndex));
  };

  static selectWeekByBaseIndex = (baseIndex: number) => (dispatch: AppDispatch) => {
    dispatch(calendarSlice.actions.setWeekIndexByBaseIndex(baseIndex));
  };

  static setBaseIndex = (index: number) => (dispatch: AppDispatch) => {
    dispatch(calendarSlice.actions.setBaseIndex(index));
  };

  static setMonthBaseIndex = (index: number) => (dispatch: AppDispatch) => {
    dispatch(calendarSlice.actions.setMonthBaseIndex(index));
  };

  static setWeekBaseIndex = (index: number) => (dispatch: AppDispatch) => {
    dispatch(calendarSlice.actions.setWeekBaseIndex(index));
  };

  static handleMonthThunk = createAsyncThunk<void, CalendarMonth, AsyncThunkConfig>(
    PREFIX + 'handleMonth',
    async (month, thunkAPI) => {
      const {loadingKeys, loadedKeys} = thunkAPI.getState().calendar;
      const key = CalendarUtils.buildMonthKey(month);
      const actualKeyLoaded = loadingKeys.includes(key) || loadedKeys.includes(key);
      let missingMonths = CalendarUtils.generateCalendarMonths(month, CALENDAR_LOAD_INDENT);
      const missingKeys = missingMonths.map(CalendarUtils.buildMonthKey);
      const keysToLoad = missingKeys
        .filter((key) => !loadedKeys.includes(key))
        .filter((key) => !loadingKeys.includes(key));
      const shouldLoad = !actualKeyLoaded || keysToLoad.length >= CALENDAR_LOAD_INDENT;
      shouldLoad && thunkAPI.dispatch(CalendarActions.fetchRemindersThunk(keysToLoad));
    },
  );

  static fetchRemindersThunk = createAsyncThunk<[string, CalendarReminder[]][], string[], AsyncThunkConfig>(
    PREFIX + 'fetchReminders',
    async (keys, thunkAPI) => {
      const timezone = thunkAPI.getState().auth.account.info.timezone;
      const [yearFrom, monthFrom, yearTo, monthTo] = CalendarUtils.extractDatesToLoad(keys);
      const response = await NotificationService.getAllByMonths(yearFrom, monthFrom, yearTo, monthTo, timezone);
      const responseValues = response.data.flatMap((v) => v[1]);
      thunkAPI.dispatch(CalendarActions.loadDependenciesThunk(responseValues));
      const loadedKeys = response.data.map((entry) => entry[0]);
      const missingKeys = keys.filter((key) => !loadedKeys.includes(key));
      const missingReminders: [string, CalendarReminder[]][] = missingKeys.map((key) => [key, []]);
      return [...response.data, ...missingReminders];
    },
  );

  static loadDependenciesThunk = createAsyncThunk<void, CalendarReminder[], AsyncThunkConfig>(
    PREFIX + 'loadDependencies',
    async (remindersIterable, thunkAPI) => {
      const reminders = Array.from(remindersIterable).flatMap((r) => r);
      // handle groupIds
      const groupIds = CalendarUtils.extractRemindersGroupIds(reminders);
      thunkAPI.dispatch(InfoActions.handleGroupIdsThunk(groupIds));
      // handle itemIds
      const itemIds = CalendarUtils.extractRemindersItemIds(reminders);
      thunkAPI.dispatch(InfoActions.handleItemIdsThunk(itemIds));
    },
  );
}
