import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import NotificationService from '../../services/NotificationService';
import {InfoThunks} from '../info/infoActions';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarUtils} from '../../shared/utils/CalendarUtils';

enum TYPES {
  FETCH_REMINDERS = 'calendar/fetchReminders',
  LOAD_DEPENDENCIES = 'calendar/loadDependencies',
}

export class CalendarThunks {
  static fetchReminders = createAsyncThunk(
    TYPES.FETCH_REMINDERS,
    async ({year, month}: {year: number; month: number}, thunkAPI) => {
      const rootState = thunkAPI.getState() as RootState;
      const timezone = rootState.auth.account.info.timezone;
      const response = await NotificationService.getAllByMonth(year, month, timezone);
      thunkAPI.dispatch(CalendarThunks.loadDependencies(response.data));
      return response.data;
    },
  );

  static loadDependencies = createAsyncThunk(
    TYPES.LOAD_DEPENDENCIES,
    async (reminders: CalendarReminder[], thunkAPI) => {
      // handle groupIds
      const groupIds = CalendarUtils.extractRemindersGroupIds(reminders);
      thunkAPI.dispatch(InfoThunks.handleGroupIds(groupIds));
      // handle itemIds
      const itemIds = CalendarUtils.extractRemindersItemIds(reminders);
      thunkAPI.dispatch(InfoThunks.handleItemIds(itemIds));
    },
  );
}
