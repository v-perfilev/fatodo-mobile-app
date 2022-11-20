import React, {useContext} from 'react';
import {CalendarDate} from '../../../models/Calendar';

interface CalendarDialogState {
  showSelectDateDialog: (date: CalendarDate, selectDate: (date: CalendarDate) => void) => void;
}

export const CalendarDialogContext = React.createContext<CalendarDialogState>(null);
export const useCalendarDialogContext = (): CalendarDialogState => useContext(CalendarDialogContext);
