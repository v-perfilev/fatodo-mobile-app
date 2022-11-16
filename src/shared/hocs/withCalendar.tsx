import React, {ComponentType, memo, useCallback, useMemo, useRef} from 'react';
import {flowRight} from 'lodash';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {CalendarContext} from '../contexts/CalendarContext';
import {useSharedValue} from 'react-native-reanimated';
import {CalendarDate, CalendarMode} from '../../models/Calendar';
import {CalendarConstants, CalendarUtils} from '../utils/CalendarUtils';
import {
  CALENDAR_DATE_HEIGHT,
  CALENDAR_MARGIN_HEIGHT,
  CALENDAR_TITLE_HEIGHT,
  CALENDAR_WEEKDAYS_HEIGHT,
} from '../../constants';

const CALENDAR_BASE_HEIGHT = CALENDAR_MARGIN_HEIGHT + CALENDAR_TITLE_HEIGHT + CALENDAR_WEEKDAYS_HEIGHT;

const initialDate = CalendarUtils.getCurrentDate();
const initialControlIndex = CalendarConstants.maxWeekIndex;
const initialWeekCount = CalendarUtils.getWeekCountInMonth(initialDate.monthIndex);
const initialMinControlHeight = CALENDAR_BASE_HEIGHT + CALENDAR_DATE_HEIGHT;
const initialMaxControlHeight = CALENDAR_BASE_HEIGHT + CALENDAR_DATE_HEIGHT * initialWeekCount;

const withCalendar = (Component: ComponentType) => (props: any) => {
  // pans
  const controlPanRef = useRef<PanGestureHandler>();
  const contentPanRef = useRef<PanGestureHandler>();
  // control
  const minControlHeight = useSharedValue<number>(initialMinControlHeight);
  const maxControlHeight = useSharedValue<number>(initialMaxControlHeight);
  // values
  const mode = useSharedValue<CalendarMode>('month');
  const controlIndex = useSharedValue<number>(initialControlIndex);
  const monthIndex = useSharedValue<number>(initialDate.monthIndex);
  const weekIndex = useSharedValue<number>(initialDate.weekIndex);
  const dateIndex = useSharedValue<number>(initialDate.dateIndex);
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
    maxControlHeight.value = CALENDAR_BASE_HEIGHT + CALENDAR_DATE_HEIGHT * weekCount;
  };

  const recalculateBorders = (mode: CalendarMode, monthIndex: number, weekIndex: number, dateIndex: number) => {
    canScrollControlLeft.value = mode === 'month' ? monthIndex > 0 : weekIndex > 0;
    canScrollControlRight.value =
      mode === 'month' ? monthIndex < CalendarConstants.maxMonthIndex : weekIndex < CalendarConstants.maxWeekIndex;
    canScrollContentLeft.value = dateIndex > 0;
    canScrollContentRight.value = dateIndex < CalendarConstants.maxDateIndex;
  };

  const setMode = useCallback((newMode: CalendarMode) => {
    mode.value = newMode;
  }, []);

  const setDate = useCallback((newDate: CalendarDate) => {
    if (newDate.date === 0) {
      const currentDate = CalendarUtils.getDateByDateIndex(dateIndex.value);
      newDate = {...newDate, date: currentDate.date};
    }

    const date = CalendarUtils.enrichDate(newDate);

    let newControlIndex = controlIndex.value;
    if (date.monthIndex !== monthIndex.value && mode.value === 'month') {
      newControlIndex = controlIndex.value + date.monthIndex - monthIndex.value;
    } else if (date.weekIndex !== weekIndex.value && mode.value === 'week') {
      newControlIndex = controlIndex.value + date.weekIndex - weekIndex.value;
    }

    controlIndex.value = newControlIndex;
    dateIndex.value = date.dateIndex;
    weekIndex.value = date.weekIndex;
    monthIndex.value = date.monthIndex;

    recalculateControlHeight(date.monthIndex);
    recalculateBorders(mode.value, date.monthIndex, date.weekIndex, date.dateIndex);
  }, []);

  const setDateByControlIndex = useCallback((newControlIndex: number) => {
    const count = newControlIndex - controlIndex.value;
    const baseDate = CalendarUtils.getDateByDateIndex(dateIndex.value);
    const date = CalendarUtils.addIndexesToDate(baseDate, count, mode.value);

    controlIndex.value = newControlIndex;
    dateIndex.value = date.dateIndex;
    weekIndex.value = date.weekIndex;
    monthIndex.value = date.monthIndex;

    recalculateControlHeight(date.monthIndex);
    recalculateBorders(mode.value, date.monthIndex, date.weekIndex, date.dateIndex);
  }, []);

  const value = useMemo(
    () => ({
      controlPanRef,
      contentPanRef,
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
