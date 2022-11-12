import React, {memo, useMemo} from 'react';
import Animated from 'react-native-reanimated';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {ArrayUtils} from '../../../../shared/utils/ArrayUtils';
import {CalendarMonthParams, CalendarWeekParams} from '../../../../models/Calendar';
import CalendarViewControlList from './CalendarViewControlList';
import {usePreviousValue} from '../../../../shared/hooks/usePreviousValue';

type CalendarViewControlContainerProps = {
  rate: Animated.SharedValue<number>;
};

const LIST_INDENT = 1;

const CalendarViewControlContainer = ({rate}: CalendarViewControlContainerProps) => {
  const mode = useAppSelector(CalendarSelectors.mode);
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);
  const weekIndex = useAppSelector(CalendarSelectors.weekIndex);
  const prevMode = usePreviousValue(mode);

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

  return <CalendarViewControlList monthParams={monthParams} weekParams={weekParams} rate={rate} />;
};

export default memo(CalendarViewControlContainer);
