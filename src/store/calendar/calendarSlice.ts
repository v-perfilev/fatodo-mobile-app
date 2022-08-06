import {createSlice} from '@reduxjs/toolkit';
import {CalendarState} from './calendarType';
import {CalendarThunks} from './calendarActions';
import {MapUtils} from '../../shared/utils/MapUtils';

const initialState: CalendarState = {
  reminders: [],
  loading: false,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /*
    fetchReminders
    */
    builder.addCase(CalendarThunks.fetchReminders.pending, (state: CalendarState) => {
      state.loading = true;
    });
    builder.addCase(CalendarThunks.fetchReminders.fulfilled, (state: CalendarState, action) => {
      const key = String(action.meta.arg.year + action.meta.arg.month);
      const reminders = action.payload;
      state.reminders = MapUtils.setValue(state.reminders, key, reminders);
      state.loading = true;
    });
    builder.addCase(CalendarThunks.fetchReminders.rejected, (state: CalendarState) => {
      state.loading = false;
    });
  },
});

export default calendarSlice;
