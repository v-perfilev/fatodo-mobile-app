import * as React from 'react';
import {useContext} from 'react';
import {CalendarDate} from '../../models/Calendar';

export interface CalendarState {
  date: CalendarDate;
  setDate: (date: CalendarDate) => void;
  monthIndex: number;
  setMonthIndex: (monthIndex: number) => void;
  weekIndex: number;
  setWeekIndex: (weekIndex: number) => void;
}

export const CalendarContext = React.createContext<CalendarState>({} as CalendarState);
export const useCalendarContext = (): CalendarState => useContext(CalendarContext);
