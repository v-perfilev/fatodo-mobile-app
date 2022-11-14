import React, {MutableRefObject, useContext} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {CalendarViewHorizontalPanMethods} from '../../screens/calendar/calendarView/calendarViewPan/CalendarViewHorizontalPan';

export interface CalendarState {
  controlPanRef: MutableRefObject<PanGestureHandler>;
  contentPanRef: MutableRefObject<PanGestureHandler>;
  imperativeControlPanRef: MutableRefObject<CalendarViewHorizontalPanMethods>;
  imperativeContentPanRef: MutableRefObject<CalendarViewHorizontalPanMethods>;
}

export const CalendarContext = React.createContext<CalendarState>({} as CalendarState);
export const useCalendarContext = (): CalendarState => useContext(CalendarContext);
