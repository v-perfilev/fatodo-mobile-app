import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import Animated, {runOnJS, useDerivedValue} from 'react-native-reanimated';
import CalendarViewTitle from '../CalendarViewTitle';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import CalendarViewControlPan from '../calendarViewControlPan/CalendarViewControlPan';
import {CalendarActions} from '../../../../store/calendar/calendarActions';
import {ArrayUtils} from '../../../../shared/utils/ArrayUtils';
import {CalendarMonthParams, CalendarWeekParams} from '../../../../models/Calendar';
import CalendarViewControlList from './CalendarViewControlList';
import Separator from '../../../../components/layouts/Separator';
import {usePreviousValue} from '../../../../shared/hooks/usePreviousValue';

type CalendarViewControlProps = {
  rate: Animated.SharedValue<number>;
};

const LIST_INDENT = 1;

const CalendarViewControl = ({rate}: CalendarViewControlProps) => {
  const dispatch = useAppDispatch();
  const baseIndex = useAppSelector(CalendarSelectors.baseIndex);
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);
  const weekIndex = useAppSelector(CalendarSelectors.weekIndex);
  const [mode, setMode] = useState<'month' | 'week'>('month');
  const prevBaseIndex = usePreviousValue(baseIndex);
  const prevMonthIndex = usePreviousValue(monthIndex);
  const prevWeekIndex = usePreviousValue(weekIndex);
  const prevMode = usePreviousValue(mode);

  const setBaseIndex = useCallback(
    (index: number) => {
      mode === 'month'
        ? dispatch(CalendarActions.selectMonth(monthIndex + index - baseIndex))
        : dispatch(CalendarActions.selectWeek(weekIndex + index - baseIndex));
      dispatch(CalendarActions.setBaseIndex(index));
    },
    [baseIndex, monthIndex, weekIndex, mode],
  );

  const monthParams = useMemo<CalendarMonthParams[]>(() => {
    const indent = mode === 'month' || mode !== prevMode ? LIST_INDENT : 0;
    return ArrayUtils.range(-indent, indent).map((i) => ({
      monthIndex: monthIndex + i,
      freeze: mode !== 'month' && i !== 0,
    }));
  }, [monthIndex, mode]);

  const weekParams = useMemo<CalendarWeekParams[]>(() => {
    const indent = mode === 'week' || mode !== prevMode ? LIST_INDENT : 0;
    return ArrayUtils.range(-indent, indent).map((i) => ({
      weekIndex: weekIndex + i,
      freeze: i !== 0,
    }));
  }, [weekIndex, mode]);

  /*
  Effects
   */

  useDerivedValue(() => {
    if (rate.value === 0 && mode !== 'week') {
      runOnJS(setMode)('week');
    } else if (rate.value === 1 && mode !== 'month') {
      runOnJS(setMode)('month');
    }
  });

  useEffect(() => {
    if (baseIndex !== prevBaseIndex && monthIndex === prevMonthIndex && weekIndex === prevWeekIndex) {
      mode === 'month'
        ? dispatch(CalendarActions.setWeekBaseIndex(baseIndex - weekIndex))
        : dispatch(CalendarActions.setMonthBaseIndex(baseIndex - monthIndex));
    }
  }, [baseIndex]);

  useEffect(() => {
    if (baseIndex === prevBaseIndex && monthIndex !== prevMonthIndex && mode === 'month') {
      dispatch(CalendarActions.setBaseIndex(baseIndex + monthIndex - prevMonthIndex));
    }
    if (baseIndex === prevBaseIndex && weekIndex !== prevWeekIndex && mode === 'week') {
      dispatch(CalendarActions.setBaseIndex(baseIndex + weekIndex - prevWeekIndex));
    }
    if (baseIndex === prevBaseIndex && monthIndex !== prevMonthIndex && mode === 'week') {
      dispatch(CalendarActions.setMonthBaseIndex(baseIndex - monthIndex));
    }
    if (baseIndex === prevBaseIndex && weekIndex !== prevWeekIndex && mode === 'month') {
      dispatch(CalendarActions.setWeekBaseIndex(baseIndex - weekIndex));
    }
  }, [monthIndex, weekIndex]);

  /*
  Layout
   */

  const list = <CalendarViewControlList monthParams={monthParams} weekParams={weekParams} rate={rate} />;

  return (
    <>
      <CalendarViewTitle />
      <Separator />
      <CalendarViewControlPan list={list} index={baseIndex} setIndex={setBaseIndex} canScrollLeft canScrollRight />
      <Separator />
    </>
  );
};

export default memo(CalendarViewControl);
