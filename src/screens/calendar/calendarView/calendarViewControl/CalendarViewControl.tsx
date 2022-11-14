import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import Animated, {runOnJS, useDerivedValue} from 'react-native-reanimated';
import CalendarViewTitle from '../CalendarViewTitle';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {CalendarActions} from '../../../../store/calendar/calendarActions';
import {CalendarMode} from '../../../../models/Calendar';
import Separator from '../../../../components/layouts/Separator';
import {CalendarConstants} from '../../../../shared/utils/CalendarUtils';
import CalendarViewControlList from './CalendarViewControlList';
import CalendarViewHorizontalPan from '../calendarViewPan/CalendarViewHorizontalPan';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import {ArrayUtils} from '../../../../shared/utils/ArrayUtils';

type CalendarViewControlProps = {
  rate: Animated.SharedValue<number>;
};

const CalendarViewControl = ({rate}: CalendarViewControlProps) => {
  const {controlPanRef, imperativeControlPanRef} = useCalendarContext();
  const dispatch = useAppDispatch();
  const mode = useAppSelector(CalendarSelectors.mode);
  const controlIndex = useAppSelector(CalendarSelectors.controlIndex);
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);
  const weekIndex = useAppSelector(CalendarSelectors.weekIndex);
  const controlIndexesToIgnore = useRef<number[]>([]);

  const setControlIndex = useCallback(
    (index: number) => {
      controlIndexesToIgnore.current.push(index);
      dispatch(CalendarActions.setDateByControlIndex(index));
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
    controlIndexesToIgnore.current.includes(controlIndex)
      ? (controlIndexesToIgnore.current = ArrayUtils.deleteValue(controlIndexesToIgnore.current, controlIndex))
      : imperativeControlPanRef.current.scrollToIndex(controlIndex);
  }, [controlIndex]);

  useEffect(() => {
    mode === 'month'
      ? dispatch(CalendarActions.setWeekControlIndex(controlIndex - weekIndex))
      : dispatch(CalendarActions.setMonthControlIndex(controlIndex - monthIndex));
  }, [controlIndex, monthIndex, weekIndex]);

  return (
    <>
      <CalendarViewTitle />
      <Separator />
      <CalendarViewHorizontalPan
        index={controlIndex}
        setIndex={setControlIndex}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        imperativePanRef={imperativeControlPanRef}
        horizontalPanRef={controlPanRef}
      >
        <CalendarViewControlList rate={rate} />
      </CalendarViewHorizontalPan>
      <Separator />
    </>
  );
};

export default memo(CalendarViewControl);
