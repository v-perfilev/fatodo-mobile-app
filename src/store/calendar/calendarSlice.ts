import {createSlice} from '@reduxjs/toolkit';
import {CalendarState} from './calendarType';
import {CalendarActions} from './calendarActions';
import {CalendarUtils} from '../../shared/utils/CalendarUtils';

const initialState: CalendarState = {
  reminders: [],
  loading: false,
  loadingKeys: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /*
    fetchReminders
    */
    builder.addCase(CalendarActions.fetchRemindersThunk.pending, (state: CalendarState, action) => {
      state.loading = true;
      state.loadingKeys = CalendarUtils.preparePendingLoadingKeys(state.loadingKeys, action.meta.arg);
    });
    builder.addCase(CalendarActions.fetchRemindersThunk.fulfilled, (state: CalendarState, action) => {
      state.reminders = CalendarUtils.updateRemindersMap(state.reminders, action.payload, action.meta.arg);
      state.loading = true;
      state.loadingKeys = CalendarUtils.prepareFinishedLoadingKeys(state.loadingKeys, action.meta.arg);
    });
    builder.addCase(CalendarActions.fetchRemindersThunk.rejected, (state: CalendarState, action) => {
      state.loading = false;
      state.loadingKeys = CalendarUtils.prepareFinishedLoadingKeys(state.loadingKeys, action.meta.arg);
    });
  },
});

export default calendarSlice;
