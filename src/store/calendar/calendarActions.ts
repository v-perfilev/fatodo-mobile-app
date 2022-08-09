import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import NotificationService from '../../services/NotificationService';
import {InfoThunks} from '../info/infoActions';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarUtils} from '../../shared/utils/CalendarUtils';

type CalendarFetchPayload = {
  yearFrom: number;
  monthFrom: number;
  yearTo: number;
  monthTo: number;
};

type CalendarRefreshPayload = {
  year: number;
  month: number;
};

enum TYPES {
  HANDLE_REMINDER_KEYS = 'calendar/handleReminderKeys',
  FETCH_REMINDERS = 'calendar/fetchReminders',
  LOAD_DEPENDENCIES = 'calendar/loadDependencies',
}

export class CalendarThunks {
  static handleReminderKeys = createAsyncThunk(TYPES.HANDLE_REMINDER_KEYS, async (keys: string[], thunkAPI) => {
    const {reminders, loadingKeys} = (thunkAPI.getState() as RootState).calendar;
    const keysToLoad = CalendarUtils.extractKeysToLoad(keys, reminders, loadingKeys);
    keysToLoad.length > 0 && thunkAPI.dispatch(CalendarThunks.fetchReminders(keys));
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
