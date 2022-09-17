import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from '../store';
import NotificationService from '../../services/NotificationService';
import {InfoActions} from '../info/infoActions';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarUtils} from '../../shared/utils/CalendarUtils';
import {CalendarMonth} from '../../models/Calendar';
import {CALENDAR_LOAD_INDENT} from '../../constants';

const PREFIX = 'calendar/';

export class CalendarActions {
  static handleMonthThunk = createAsyncThunk<void, CalendarMonth, AsyncThunkConfig>(
    PREFIX + 'handleMonth',
    async (month, thunkAPI) => {
      const {reminders, loadingKeys} = thunkAPI.getState().calendar;
      const loadedKeys = Array.from(new Map(reminders).keys());
      const actualKeyLoaded = loadedKeys.includes(month.key);
      let missingMonths = CalendarUtils.generateCalendarMonths(month, CALENDAR_LOAD_INDENT);
      const missingKeys = missingMonths.map((r) => r.key);
      const keysToLoad = missingKeys
        .filter((key) => !loadedKeys.includes(key))
        .filter((key) => !loadingKeys.includes(key));
      const shouldLoad = !actualKeyLoaded || keysToLoad.length >= CALENDAR_LOAD_INDENT;
      shouldLoad && thunkAPI.dispatch(CalendarActions.fetchRemindersThunk(keysToLoad));
    },
  );

  static fetchRemindersThunk = createAsyncThunk<[string, CalendarReminder[]][], string[], AsyncThunkConfig>(
    PREFIX + 'fetchReminders',
    async (keys: string[], thunkAPI) => {
      const timezone = thunkAPI.getState().auth.account.info.timezone;
      const [yearFrom, monthFrom, yearTo, monthTo] = CalendarUtils.extractDatesToLoad(keys);
      const response = await NotificationService.getAllByMonths(yearFrom, monthFrom, yearTo, monthTo, timezone);
      const responseEntries = Object.entries(response.data);
      const responseValues = responseEntries.flatMap((v) => v[1]);
      thunkAPI.dispatch(CalendarActions.loadDependenciesThunk(responseValues));
      return responseEntries;
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
