import React, {ComponentType, memo, useMemo, useRef} from 'react';
import {flowRight} from 'lodash';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {CalendarViewHorizontalPanMethods} from '../../screens/calendar/calendarView/calendarViewPan/CalendarViewHorizontalPan';
import {CalendarContext} from '../contexts/CalendarContext';

const withCalendar = (Component: ComponentType) => (props: any) => {
  const controlPanRef = useRef<PanGestureHandler>();
  const contentPanRef = useRef<PanGestureHandler>();
  const imperativeControlPanRef = useRef<CalendarViewHorizontalPanMethods>();
  const imperativeContentPanRef = useRef<CalendarViewHorizontalPanMethods>();

  const value = useMemo(
    () => ({
      controlPanRef,
      contentPanRef,
      imperativeControlPanRef,
      imperativeContentPanRef,
    }),
    [],
  );

  return (
    <CalendarContext.Provider value={value}>
      <Component {...props} />
    </CalendarContext.Provider>
  );
};

export default flowRight([memo, withCalendar]);
