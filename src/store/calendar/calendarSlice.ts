import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CalendarState} from './calendarType';
import {CalendarActions} from './calendarActions';
import {CalendarReminder} from '../../models/Reminder';
import {FilterUtils} from '../../shared/utils/FilterUtils';
import {CalendarConstants, CalendarUtils} from '../../shared/utils/CalendarUtils';
import {CalendarDate, CalendarMode} from '../../models/Calendar';

const date = CalendarUtils.getCurrentDate();
const monthIndex = CalendarUtils.getMonthIndexByItem(date);
const weekIndex = CalendarUtils.getWeekIndexByDate(date);
const dateIndex = CalendarUtils.getDateIndexByDate(date);

const controlIndex = CalendarConstants.maxWeekIndex;
const monthControlIndex = controlIndex - monthIndex;
const weekControlIndex = controlIndex - weekIndex;

const initialState: CalendarState = {
  // Control
  mode: 'month',
  controlIndex,
  monthControlIndex,
  weekControlIndex,
  // Content
  dateIndex,
  weekIndex,
  monthIndex,
  // Common
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

    setMode: (state: CalendarState, action: PayloadAction<CalendarMode>) => {
      state.mode = action.payload;
    },

    setDate: (state: CalendarState, action: PayloadAction<CalendarDate>) => {
      let date = action.payload;
      if (date.date === 0) {
        const currentDate = CalendarUtils.getDateByDateIndex(state.dateIndex);
        date = {...date, date: currentDate.date};
      }

      const newDateIndex = CalendarUtils.getDateIndexByDate(date);
      const newWeekIndex = CalendarUtils.getWeekIndexByDate(date);
      const newMonthIndex = CalendarUtils.getMonthIndexByItem(date);

      if (newMonthIndex !== state.monthIndex && state.mode === 'month') {
        const newControlIndex = state.controlIndex + newMonthIndex - state.monthIndex;
        state.controlIndex !== newControlIndex && (state.controlIndex = newControlIndex);
      } else if (newWeekIndex !== state.weekIndex && state.mode === 'week') {
        const newControlIndex = state.controlIndex + newWeekIndex - state.weekIndex;
        state.controlIndex !== newControlIndex && (state.controlIndex = newControlIndex);
      }

      state.dateIndex !== newDateIndex && (state.dateIndex = newDateIndex);
      state.weekIndex !== newWeekIndex && (state.weekIndex = newWeekIndex);
      state.monthIndex !== newMonthIndex && (state.monthIndex = newMonthIndex);

      if (state.mode === 'month') {
        const newWeekControlIndex = state.controlIndex - state.weekIndex;
        state.weekControlIndex !== newWeekControlIndex && (state.weekControlIndex = newWeekControlIndex);
      } else {
        const newMonthControlIndex = state.controlIndex - state.monthIndex;
        state.monthControlIndex !== newMonthControlIndex && (state.monthControlIndex = newMonthControlIndex);
      }
    },

    setDateByControlIndex: (state: CalendarState, action: PayloadAction<number>) => {
      const newControlIndex = action.payload;
      const count = newControlIndex - state.controlIndex;
      const baseDate = CalendarUtils.getDateByDateIndex(state.dateIndex);
      const date = CalendarUtils.addIndexesToDate(baseDate, count, state.mode);

      const newDateIndex = CalendarUtils.getDateIndexByDate(date);
      const newWeekIndex = CalendarUtils.getWeekIndexByDate(date);
      const newMonthIndex = CalendarUtils.getMonthIndexByItem(date);

      state.controlIndex !== newControlIndex && (state.controlIndex = newControlIndex);
      state.dateIndex !== newDateIndex && (state.dateIndex = newDateIndex);
      state.weekIndex !== newWeekIndex && (state.weekIndex = newWeekIndex);
      state.monthIndex !== newMonthIndex && (state.monthIndex = newMonthIndex);

      if (state.mode === 'month') {
        const newWeekControlIndex = state.controlIndex - state.weekIndex;
        state.weekControlIndex !== newWeekControlIndex && (state.weekControlIndex = newWeekControlIndex);
      } else {
        const newMonthControlIndex = state.controlIndex - state.monthIndex;
        state.monthControlIndex !== newMonthControlIndex && (state.monthControlIndex = newMonthControlIndex);
      }
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
