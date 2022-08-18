import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import NotificationService from '../../services/NotificationService';
import {InfoThunks} from '../info/infoActions';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarUtils} from '../../shared/utils/CalendarUtils';
import {CalendarMonth} from '../../models/Calendar';

enum TYPES {
  HANDLE_REMINDER_KEYS = 'calendar/handleReminderKeys',
  FETCH_REMINDERS = 'calendar/fetchReminders',
  LOAD_DEPENDENCIES = 'calendar/loadDependencies',
}

export class CalendarThunks {
  static handleMonth = createAsyncThunk(TYPES.HANDLE_REMINDER_KEYS, async (month: CalendarMonth, thunkAPI) => {
    const {reminders, loadingKeys} = (thunkAPI.getState() as RootState).calendar;
    const loadedKeys = Array.from(new Map(reminders).keys());
    const loadIndent = 5;

    const actualKeyLoaded = loadedKeys.includes(month.key);

    let missingMonths = CalendarUtils.generateCalendarMonths(month, loadIndent);
    const missingKeys = missingMonths.map((r) => r.key);

    const keysToLoad = missingKeys
      .filter((key) => !loadedKeys.includes(key))
      .filter((key) => !loadingKeys.includes(key));

    const shouldLoad = !actualKeyLoaded || keysToLoad.length >= loadIndent;

    shouldLoad && thunkAPI.dispatch(CalendarThunks.fetchReminders(keysToLoad));
  });

  static fetchReminders = createAsyncThunk(TYPES.FETCH_REMINDERS, async (keys: string[], thunkAPI) => {
    const rootState = thunkAPI.getState() as RootState;
    const timezone = rootState.auth.account.info.timezone;
    const [yearFrom, monthFrom, yearTo, monthTo] = CalendarUtils.extractDatesToLoad(keys);
    const response = await NotificationService.getAllByMonths(yearFrom, monthFrom, yearTo, monthTo, timezone);
    const responseEntries = Object.entries(response.data);
    const responseMap = new Map(responseEntries);
    thunkAPI.dispatch(CalendarThunks.loadDependencies(responseMap.values()));
    return responseEntries;
  });

  static loadDependencies = createAsyncThunk(
    TYPES.LOAD_DEPENDENCIES,
    async (remindersIterable: Iterable<CalendarReminder[]>, thunkAPI) => {
      const reminders = Array.from(remindersIterable).flatMap((r) => r);
      // handle groupIds
      const groupIds = CalendarUtils.extractRemindersGroupIds(reminders);
      thunkAPI.dispatch(InfoThunks.handleGroupIds(groupIds));
      // handle itemIds
      const itemIds = CalendarUtils.extractRemindersItemIds(reminders);
      thunkAPI.dispatch(InfoThunks.handleItemIds(itemIds));
    },
  );
}
