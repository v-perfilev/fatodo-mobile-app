import React, {MutableRefObject, useContext} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {CalendarViewHorizontalPanMethods} from '../../screens/calendar/calendarView/calendarViewPan/CalendarViewHorizontalPan';
import Animated from 'react-native-reanimated';
import {CalendarDate, CalendarMode} from '../../models/Calendar';
import {CalendarViewPanMethods} from '../../screens/calendar/calendarView/calendarViewPan/CalendarViewPan';

export interface CalendarState {
  // pans
  imperativePanRef: MutableRefObject<CalendarViewPanMethods>;
  controlPanRef: MutableRefObject<PanGestureHandler>;
  contentPanRef: MutableRefObject<PanGestureHandler>;
  imperativeControlPanRef: MutableRefObject<CalendarViewHorizontalPanMethods>;
  imperativeContentPanRef: MutableRefObject<CalendarViewHorizontalPanMethods>;
  // control
  minControlHeight: Animated.SharedValue<number>;
  maxControlHeight: Animated.SharedValue<number>;
  // values
  mode: Animated.SharedValue<CalendarMode>;
  controlIndex: Animated.SharedValue<number>;
  monthIndex: Animated.SharedValue<number>;
  weekIndex: Animated.SharedValue<number>;
  dateIndex: Animated.SharedValue<number>;
  // borders
  canScrollControlLeft: Animated.SharedValue<boolean>;
  canScrollControlRight: Animated.SharedValue<boolean>;
  canScrollContentLeft: Animated.SharedValue<boolean>;
  canScrollContentRight: Animated.SharedValue<boolean>;
  // setters
  setMode: (mode: CalendarMode) => void;
  setDate: (date: CalendarDate) => void;
  setDateByControlIndex: (controlIndex: number) => void;
}

export const CalendarContext = React.createContext<CalendarState>({} as CalendarState);
export const useCalendarContext = (): CalendarState => useContext(CalendarContext);
