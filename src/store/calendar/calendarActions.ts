import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import NotificationService from '../../services/NotificationService';

enum TYPES {
  FETCH_REMINDERS = 'calendar/fetchReminders',
}

export class CalendarThunks {
  static fetchReminders = createAsyncThunk(
    TYPES.FETCH_REMINDERS,
    async ({year, month}: {year: number; month: number}, thunkAPI) => {
      const rootState = thunkAPI.getState() as RootState;
      const timezone = rootState.auth.account.info.timezone;
      const response = await NotificationService.getAllByMonth(year, month, timezone);
      return response.data;
    },
  );
}
