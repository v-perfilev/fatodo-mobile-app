import React, {MutableRefObject, useContext} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {CalendarDate, CalendarMode} from '../../models/Calendar';

export interface CalendarState {
  // Pans
  controlPanRef: MutableRefObject<PanGestureHandler>;
  contentPanRef: MutableRefObject<PanGestureHandler>;
  // Control
  minControlHeight: Animated.SharedValue<number>;
  maxControlHeight: Animated.SharedValue<number>;
  // Values
  rate: Animated.SharedValue<number>;
  translate: Animated.SharedValue<number>;
  mode: Animated.SharedValue<CalendarMode>;
  controlIndex: Animated.SharedValue<number>;
  monthIndex: Animated.SharedValue<number>;
  weekIndex: Animated.SharedValue<number>;
  dateIndex: Animated.SharedValue<number>;
  // Borders
  canScrollControlLeft: Animated.SharedValue<boolean>;
  canScrollControlRight: Animated.SharedValue<boolean>;
  canScrollContentLeft: Animated.SharedValue<boolean>;
  canScrollContentRight: Animated.SharedValue<boolean>;
  // Setters
  setDate: (date: CalendarDate) => void;
  setDateByControlIndex: (controlIndex: number) => void;
}

export const CalendarContext = React.createContext<CalendarState>({} as CalendarState);
export const useCalendarContext = (): CalendarState => useContext(CalendarContext);
