import React, {memo, useMemo} from 'react';
import Animated from 'react-native-reanimated';
import FBox from '../../../../components/boxes/FBox';
import {CalendarMonthParams, CalendarWeekParams} from '../../../../models/Calendar';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {usePreviousValue} from '../../../../shared/hooks/usePreviousValue';
import {ArrayUtils} from '../../../../shared/utils/ArrayUtils';
import CalendarViewControlMonthWithDays from './CalendarViewControlMonthWithDays';
import CalendarViewControlWeekWithDays from './CalendarViewControlWeekWithDays';

type CalendarViewControlListProps = {
  rate: Animated.SharedValue<number>;
};

const LIST_INDENT = 1;

const CalendarViewControlList = ({rate}: CalendarViewControlListProps) => {
  const mode = useAppSelector(CalendarSelectors.mode);
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);
  const weekIndex = useAppSelector(CalendarSelectors.weekIndex);
  const monthBaseIndex = useAppSelector(CalendarSelectors.monthControlIndex);
  const weekBaseIndex = useAppSelector(CalendarSelectors.weekControlIndex);
  const prevMode = usePreviousValue(mode);

  const monthParams = useMemo<CalendarMonthParams[]>(() => {
    const indent = mode === 'month' || mode !== prevMode ? LIST_INDENT : 0;
    return ArrayUtils.range(-indent, indent).map((i) => ({
      monthIndex: monthIndex + i,
      baseIndex: monthBaseIndex + monthIndex + i,
      freeze: i !== 0,
    }));
  }, [monthIndex, monthBaseIndex, mode]);

  const weekParams = useMemo<CalendarWeekParams[]>(() => {
    const indent = mode === 'week' || mode !== prevMode ? LIST_INDENT : 0;
    return ArrayUtils.range(-indent, indent).map((i) => ({
      weekIndex: weekIndex + i,
      baseIndex: weekBaseIndex + weekIndex + i,
      freeze: i !== 0,
    }));
  }, [weekIndex, weekBaseIndex, mode]);

  return (
    <FBox position="relative" grow>
      {monthParams.map(({monthIndex, baseIndex, freeze}) => (
        <CalendarViewControlMonthWithDays
          monthIndex={monthIndex}
          baseIndex={baseIndex}
          weekIndex={weekIndex}
          freeze={freeze}
          rate={rate}
          key={`month_${monthIndex}`}
        />
      ))}
      {weekParams.map(({weekIndex, baseIndex, freeze}) => (
        <CalendarViewControlWeekWithDays
          weekIndex={weekIndex}
          baseIndex={baseIndex}
          monthIndex={monthIndex}
          freeze={freeze}
          rate={rate}
          key={`week_${weekIndex}`}
        />
      ))}
    </FBox>
  );
};

export default memo(CalendarViewControlList);
