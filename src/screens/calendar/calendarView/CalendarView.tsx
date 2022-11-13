import React, {ReactElement, useCallback, useEffect, useMemo, useRef} from 'react';
import CalendarViewHeader from './CalendarViewHeader';
import CalendarViewPan from './calendarViewPan/CalendarViewPan';
import Animated from 'react-native-reanimated';
import {
  CALENDAR_DATE_HEIGHT,
  CALENDAR_MARGIN_HEIGHT,
  CALENDAR_TITLE_HEIGHT,
  CALENDAR_WEEKDAYS_HEIGHT,
} from '../../../constants';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import CalendarViewControl from './calendarViewControl/CalendarViewControl';
import {CalendarActions} from '../../../store/calendar/calendarActions';
import {useIsFocused} from '@react-navigation/native';
import CalendarViewContent from './calendarViewContent/CalendarViewContent';
import {PanGestureHandler} from 'react-native-gesture-handler';

const CALENDAR_BASE_HEIGHT = CALENDAR_MARGIN_HEIGHT + CALENDAR_TITLE_HEIGHT + CALENDAR_WEEKDAYS_HEIGHT;

const CalendarView = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);
  const shouldLoad = useAppSelector(CalendarSelectors.shouldLoad);
  const rootPanRef = useRef<PanGestureHandler>();
  const contentPanRef = useRef<PanGestureHandler>();
  const controlPanRef = useRef<PanGestureHandler>();

  const weekCount = useMemo<number>(() => {
    return CalendarUtils.getWeekCountInMonth(monthIndex);
  }, [monthIndex]);

  const minControlHeight = useMemo<number>(() => {
    return CALENDAR_BASE_HEIGHT + CALENDAR_DATE_HEIGHT;
  }, []);

  const maxControlHeight = useMemo<number>(() => {
    return CALENDAR_BASE_HEIGHT + CALENDAR_DATE_HEIGHT * weekCount;
  }, [weekCount]);

  const control = useCallback((rate: Animated.SharedValue<number>) => {
    return <CalendarViewControl rate={rate} controlPanRef={controlPanRef} />;
  }, []);

  const content = useMemo<ReactElement>(() => {
    return <CalendarViewContent contentPanRef={contentPanRef} />;
  }, []);

  useEffect(() => {
    dispatch(CalendarActions.handleMonthThunk(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    isFocused && shouldLoad && dispatch(CalendarActions.handleMonthThunk(monthIndex));
  }, [isFocused, shouldLoad]);

  return (
    <>
      <CalendarViewHeader />
      <CalendarViewPan
        control={control}
        content={content}
        minControlHeight={minControlHeight}
        maxControlHeight={maxControlHeight}
        rootPanRef={rootPanRef}
        controlPanRef={controlPanRef}
        contentPanRef={contentPanRef}
      />
    </>
  );
};
export default CalendarView;
