import * as React from 'react';
import {useContext} from 'react';
import {CalendarItem, CalendarMonth} from '../../../models/Calendar';

interface CalendarDialogState {
  showSelectMonthDialog: (month: CalendarMonth, selectMonth: (month: CalendarItem) => void) => void;
}

export const CalendarDialogContext = React.createContext<CalendarDialogState>(null);
export const useCalendarDialogContext = (): CalendarDialogState => useContext(CalendarDialogContext);
