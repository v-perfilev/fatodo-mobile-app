import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, AsyncThunkConfig} from '../store';
import NotificationService from '../../services/NotificationService';
import {InfoActions} from '../info/infoActions';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarUtils} from '../../shared/utils/CalendarUtils';
import {CALENDAR_LOAD_INDENT} from '../../constants';
import calendarSlice from './calendarSlice';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';

const PREFIX = 'calendar/';

export class CalendarActions {
  static reset = () => (dispatch: AppDispatch) => {
    dispatch(calendarSlice.actions.reset());
  };

  static handleMonthThunk = createAsyncThunk<void, number, AsyncThunkConfig>(
    PREFIX + 'handleMonth',
    async (monthIndex, thunkAPI) => {
      const {loadingKeys, loadedKeys} = thunkAPI.getState().calendar;
      const key = CalendarUtils.buildMonthKeyByIndex(monthIndex);
      const keysToLoad = ArrayUtils.range(monthIndex - CALENDAR_LOAD_INDENT, monthIndex + CALENDAR_LOAD_INDENT)
        .map(CalendarUtils.buildMonthKeyByIndex)
        .filter((key) => !loadedKeys.includes(key))
        .filter((key) => !loadingKeys.includes(key));
      const actualKeyLoaded = loadingKeys.includes(key) || loadedKeys.includes(key);
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
