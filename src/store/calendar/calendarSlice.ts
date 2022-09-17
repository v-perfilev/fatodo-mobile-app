import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CalendarState} from './calendarType';
import {CalendarActions} from './calendarActions';
import {CalendarReminder} from '../../models/Reminder';

const initialState: CalendarState = {
  reminders: [],
  loadingKeys: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    reset: (state: CalendarState) => {
      Object.assign(state, initialState);
    },

    addLoadingKeys: (state: CalendarState, action: PayloadAction<string[]>) => {
      state.loadingKeys = [...state.loadingKeys, ...action.payload];
    },

    removeLoadingKeys: (state: CalendarState, action: PayloadAction<string[]>) => {
      state.loadingKeys = state.loadingKeys.filter((key) => !action.payload.includes(key));
    },

    setReminders: (state: CalendarState, action: PayloadAction<[string, CalendarReminder[]][]>) => {
      state.reminders = [...state.reminders, ...action.payload];
    },

    removeReminders: (state: CalendarState, action: PayloadAction<string[]>) => {
      state.reminders = state.reminders.filter((entry) => action.payload.includes(entry[0]));
    },
  },
  extraReducers: (builder) => {
    /*
    fetchReminders
    */
    builder.addCase(CalendarActions.fetchRemindersThunk.pending, (state, action) => {
      calendarSlice.caseReducers.addLoadingKeys(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(CalendarActions.fetchRemindersThunk.fulfilled, (state, action) => {
      calendarSlice.caseReducers.removeReminders(state, {...action, payload: action.meta.arg});
      calendarSlice.caseReducers.setReminders(state, action);
      calendarSlice.caseReducers.removeLoadingKeys(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(CalendarActions.fetchRemindersThunk.rejected, (state, action) => {
      calendarSlice.caseReducers.removeLoadingKeys(state, {...action, payload: action.meta.arg});
    });
  },
});

export default calendarSlice;
