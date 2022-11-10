import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CalendarState} from './calendarType';
import {CalendarActions} from './calendarActions';
import {CalendarReminder} from '../../models/Reminder';
import {FilterUtils} from '../../shared/utils/FilterUtils';
import {CalendarUtils} from '../../shared/utils/CalendarUtils';
import {CalendarDate} from '../../models/Calendar';

const date = CalendarUtils.getCurrentDate();
const monthIndex = CalendarUtils.getMonthIndexByDate(date);
const weekIndex = CalendarUtils.getWeekIndexByDate(date);
const dayIndex = CalendarUtils.getDayIndexByDate(date);
const dateIndex = date.date;

const initialState: CalendarState = {
  monthIndex,
  weekIndex,
  dayIndex,
  dateIndex,
  reminders: [],
  loadingKeys: [],
  loadedKeys: [],
  shouldLoad: true,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    reset: (state: CalendarState) => {
      Object.assign(state, initialState);
    },

    setDateIndex: (state: CalendarState, action: PayloadAction<CalendarDate>) => {
      const date = action.payload;
      state.monthIndex = CalendarUtils.getMonthIndexByDate(date);
      state.weekIndex = CalendarUtils.getWeekIndexByDate(date);
      state.dayIndex = CalendarUtils.getDayIndexByDate(date);
      state.dateIndex = date.date;
    },

    setMonthIndex: (state: CalendarState, action: PayloadAction<number>) => {
      const date = CalendarUtils.generateMonthDateByIndexes(action.payload, state.dateIndex);
      state.monthIndex = CalendarUtils.getMonthIndexByDate(date);
      state.weekIndex = CalendarUtils.getWeekIndexByDate(date);
      state.dayIndex = CalendarUtils.getDayIndexByDate(date);
      state.dateIndex = date.date;
    },

    setWeekIndex: (state: CalendarState, action: PayloadAction<number>) => {
      const date = CalendarUtils.generateWeekDateByIndexes(action.payload, state.dayIndex);
      state.monthIndex = CalendarUtils.getMonthIndexByDate(date);
      state.weekIndex = CalendarUtils.getWeekIndexByDate(date);
      state.dayIndex = CalendarUtils.getDayIndexByDate(date);
      state.dateIndex = date.date;
    },

    addLoadingKeys: (state: CalendarState, action: PayloadAction<string[]>) => {
      state.loadingKeys = [...state.loadingKeys, ...action.payload];
    },

    addLoadedKeys: (state: CalendarState, action: PayloadAction<string[]>) => {
      state.loadedKeys = [...state.loadedKeys, ...action.payload].filter(FilterUtils.uniqueFilter);
    },

    removeLoadingKeys: (state: CalendarState, action: PayloadAction<string[]>) => {
      state.loadingKeys = state.loadingKeys.filter((key) => !action.payload.includes(key));
    },

    setReminders: (state: CalendarState, action: PayloadAction<[string, CalendarReminder[]][]>) => {
      state.reminders = filterReminders([...action.payload, ...state.reminders]);
    },

    setShouldNotLoad: (state: CalendarState) => {
      state.shouldLoad = false;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchReminders
    */
    builder.addCase(CalendarActions.fetchRemindersThunk.pending, (state, action) => {
      calendarSlice.caseReducers.addLoadingKeys(state, {...action, payload: action.meta.arg});
      calendarSlice.caseReducers.setShouldNotLoad(state);
    });
    builder.addCase(CalendarActions.fetchRemindersThunk.fulfilled, (state, action) => {
      calendarSlice.caseReducers.addLoadedKeys(state, {...action, payload: action.meta.arg});
      calendarSlice.caseReducers.setReminders(state, action);
      calendarSlice.caseReducers.removeLoadingKeys(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(CalendarActions.fetchRemindersThunk.rejected, (state, action) => {
      calendarSlice.caseReducers.removeLoadingKeys(state, {...action, payload: action.meta.arg});
    });
  },
});

const filterReminders = (reminders: [string, CalendarReminder[]][]): [string, CalendarReminder[]][] => {
  return reminders.filter(FilterUtils.uniqueByKeyFilter);
};

export default calendarSlice;
