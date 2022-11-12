import React, {memo, useCallback, useEffect, useMemo} from 'react';
import Animated, {runOnJS, useDerivedValue} from 'react-native-reanimated';
import CalendarViewTitle from '../CalendarViewTitle';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import CalendarViewControlPan from '../calendarViewControlPan/CalendarViewControlPan';
import {CalendarActions} from '../../../../store/calendar/calendarActions';
import {CalendarMode} from '../../../../models/Calendar';
import Separator from '../../../../components/layouts/Separator';
import {usePreviousValue} from '../../../../shared/hooks/usePreviousValue';
import {CalendarConstants} from '../../../../shared/utils/CalendarUtils';
import CalendarViewControlContainer from './CalendarViewControlContainer';

type CalendarViewControlProps = {
  rate: Animated.SharedValue<number>;
};

const CalendarViewControl = ({rate}: CalendarViewControlProps) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(CalendarSelectors.mode);
  const baseIndex = useAppSelector(CalendarSelectors.baseIndex);
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);
  const weekIndex = useAppSelector(CalendarSelectors.weekIndex);
  const prevBaseIndex = usePreviousValue(baseIndex);
  const prevMonthIndex = usePreviousValue(monthIndex);
  const prevWeekIndex = usePreviousValue(weekIndex);

  const setBaseIndex = useCallback(
    (index: number) => {
      mode === 'month'
        ? dispatch(CalendarActions.selectMonthByBaseIndex(index))
        : dispatch(CalendarActions.selectWeekByBaseIndex(index));
      dispatch(CalendarActions.setBaseIndex(index));
    },
    [mode],
  );

  const canScrollLeft = useMemo<boolean>(() => {
    return mode === 'month' ? monthIndex > 0 : weekIndex > 0;
  }, [mode, monthIndex, weekIndex]);

  const canScrollRight = useMemo<boolean>(() => {
    return mode === 'month' ? monthIndex < CalendarConstants.maxMonthIndex : weekIndex < CalendarConstants.maxWeekIndex;
  }, [mode, monthIndex, weekIndex]);

  /*
  Effects
   */

  const setMode = (mode: CalendarMode): void => {
    dispatch(CalendarActions.setMode(mode));
  };

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

  return (
    <>
      <CalendarViewTitle />
      <Separator />
      <CalendarViewControlPan
        index={baseIndex}
        setIndex={setBaseIndex}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
      >
        <CalendarViewControlContainer rate={rate} />
      </CalendarViewControlPan>
      <Separator />
    </>
  );
};

export default memo(CalendarViewControl);
