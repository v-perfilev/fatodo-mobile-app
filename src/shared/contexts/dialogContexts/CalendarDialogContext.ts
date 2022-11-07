import * as React from 'react';
import {useContext} from 'react';
import {CalendarMonth} from '../../../models/Calendar';

interface CalendarDialogState {
  showSelectMonthDialog: (month: CalendarMonth, selectMonth: (month: CalendarMonth) => void) => void;
}

export const CalendarDialogContext = React.createContext<CalendarDialogState>(null);
export const useCalendarDialogContext = (): CalendarDialogState => useContext(CalendarDialogContext);
