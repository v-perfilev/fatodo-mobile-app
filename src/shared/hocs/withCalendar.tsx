import React, {ComponentType, memo, useCallback, useMemo, useRef} from 'react';
import {flowRight} from 'lodash';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {CalendarViewHorizontalPanMethods} from '../../screens/calendar/calendarView/calendarViewPan/CalendarViewHorizontalPan';
import {CalendarContext} from '../contexts/CalendarContext';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {CalendarDate, CalendarMode} from '../../models/Calendar';
import {CalendarConstants, CalendarUtils} from '../utils/CalendarUtils';
import {
  CALENDAR_DATE_HEIGHT,
  CALENDAR_MARGIN_HEIGHT,
  CALENDAR_TITLE_HEIGHT,
  CALENDAR_WEEKDAYS_HEIGHT,
} from '../../constants';

const initialDate = CalendarUtils.getCurrentDate();
const initialControlIndex = CalendarConstants.maxWeekIndex;
const initialMonthIndex = CalendarUtils.getMonthIndexByItem(initialDate);
const initialWeekIndex = CalendarUtils.getWeekIndexByDate(initialDate);
const initialDateIndex = CalendarUtils.getDateIndexByDate(initialDate);

const CALENDAR_BASE_HEIGHT = CALENDAR_MARGIN_HEIGHT + CALENDAR_TITLE_HEIGHT + CALENDAR_WEEKDAYS_HEIGHT;
const initialWeekCount = CalendarUtils.getWeekCountInMonth(initialMonthIndex);

const initialMinControlHeight = CALENDAR_BASE_HEIGHT + CALENDAR_DATE_HEIGHT;
const initialMaxControlHeight = CALENDAR_BASE_HEIGHT + CALENDAR_DATE_HEIGHT * initialWeekCount;

const withCalendar = (Component: ComponentType) => (props: any) => {
  // pans
  const controlPanRef = useRef<PanGestureHandler>();
  const contentPanRef = useRef<PanGestureHandler>();
  const imperativeControlPanRef = useRef<CalendarViewHorizontalPanMethods>();
  const imperativeContentPanRef = useRef<CalendarViewHorizontalPanMethods>();
  // control
  const controlHeight = useSharedValue<number>(initialMaxControlHeight);
  const minControlHeight = useSharedValue<number>(initialMinControlHeight);
  const maxControlHeight = useSharedValue<number>(initialMaxControlHeight);
  // values
  const mode = useSharedValue<CalendarMode>('month');
  const controlIndex = useSharedValue<number>(initialControlIndex);
  const monthIndex = useSharedValue<number>(initialMonthIndex);
  const weekIndex = useSharedValue<number>(initialWeekIndex);
  const dateIndex = useSharedValue<number>(initialDateIndex);
  // borders
  const canScrollControlLeft = useSharedValue<boolean>(true);
  const canScrollControlRight = useSharedValue<boolean>(true);
  const canScrollContentLeft = useSharedValue<boolean>(true);
  const canScrollContentRight = useSharedValue<boolean>(true);

  /*
  Setters
   */

  const recalculateControlHeight = (monthIndex: number) => {
    const weekCount = CalendarUtils.getWeekCountInMonth(monthIndex);
    const newMaxControlHeight = CALENDAR_BASE_HEIGHT + CALENDAR_DATE_HEIGHT * weekCount;
    if (controlHeight.value !== minControlHeight.value && maxControlHeight.value !== newMaxControlHeight) {
      controlHeight.value = withTiming(newMaxControlHeight, {duration: 300});
    }
    maxControlHeight.value = newMaxControlHeight;
  };

  const recalculateBorders = (mode: CalendarMode, monthIndex: number, weekIndex: number, dateIndex: number) => {
    canScrollControlLeft.value = mode === 'month' ? monthIndex > 0 : weekIndex > 0;
    canScrollControlRight.value =
      mode === 'month' ? monthIndex < CalendarConstants.maxMonthIndex : weekIndex < CalendarConstants.maxWeekIndex;
    canScrollContentLeft.value = dateIndex > 0;
    canScrollContentRight.value = dateIndex < CalendarConstants.maxDateIndex;
  };

  const scrollOnChange = (controlIndex: number, dateIndex: number) => {
    imperativeControlPanRef.current.scrollToIndex(controlIndex);
    imperativeContentPanRef.current.scrollToIndex(dateIndex);
  };

  const setMode = useCallback((newMode: CalendarMode) => {
    mode.value = newMode;
  }, []);

  const setDate = useCallback((newDate: CalendarDate) => {
    if (newDate.date === 0) {
      const currentDate = CalendarUtils.getDateByDateIndex(dateIndex.value);
      newDate = {...newDate, date: currentDate.date};
    }

    const newDateIndex = CalendarUtils.getDateIndexByDate(newDate);
    const newWeekIndex = CalendarUtils.getWeekIndexByDate(newDate);
    const newMonthIndex = CalendarUtils.getMonthIndexByItem(newDate);

    let newControlIndex = controlIndex.value;
    if (newMonthIndex !== monthIndex.value && mode.value === 'month') {
      newControlIndex = controlIndex.value + newMonthIndex - monthIndex.value;
    } else if (newWeekIndex !== weekIndex.value && mode.value === 'week') {
      newControlIndex = controlIndex.value + newWeekIndex - weekIndex.value;
    }

    controlIndex.value = newControlIndex;
    dateIndex.value = newDateIndex;
    weekIndex.value = newWeekIndex;
    monthIndex.value = newMonthIndex;

    recalculateControlHeight(newMonthIndex);
    scrollOnChange(newControlIndex, newDateIndex);
    recalculateBorders(mode.value, newMonthIndex, newWeekIndex, newDateIndex);
  }, []);

  const setDateByControlIndex = useCallback((newControlIndex: number) => {
    const count = newControlIndex - controlIndex.value;
    const baseDate = CalendarUtils.getDateByDateIndex(dateIndex.value);
    const date = CalendarUtils.addIndexesToDate(baseDate, count, mode.value);

    const newDateIndex = CalendarUtils.getDateIndexByDate(date);
    const newWeekIndex = CalendarUtils.getWeekIndexByDate(date);
    const newMonthIndex = CalendarUtils.getMonthIndexByItem(date);

    controlIndex.value = newControlIndex;
    dateIndex.value = newDateIndex;
    weekIndex.value = newWeekIndex;
    monthIndex.value = newMonthIndex;

    recalculateControlHeight(newMonthIndex);
    scrollOnChange(newControlIndex, newDateIndex);
    recalculateBorders(mode.value, newMonthIndex, newWeekIndex, newDateIndex);
  }, []);

  const value = useMemo(
    () => ({
      controlPanRef,
      contentPanRef,
      imperativeControlPanRef,
      imperativeContentPanRef,
      controlHeight,
      minControlHeight,
      maxControlHeight,
      mode,
      controlIndex,
      monthIndex,
      weekIndex,
      dateIndex,
      canScrollControlLeft,
      canScrollControlRight,
      canScrollContentLeft,
      canScrollContentRight,
      setMode,
      setDate,
      setDateByControlIndex,
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
