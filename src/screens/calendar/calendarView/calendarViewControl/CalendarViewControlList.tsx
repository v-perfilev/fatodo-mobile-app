import React, {memo, useMemo} from 'react';
import Animated, {runOnJS, useDerivedValue} from 'react-native-reanimated';
import FBox from '../../../../components/boxes/FBox';
import {CalendarMonthParams, CalendarWeekParams} from '../../../../models/Calendar';
import {usePreviousValue} from '../../../../shared/hooks/usePreviousValue';
import {ArrayUtils} from '../../../../shared/utils/ArrayUtils';
import CalendarViewControlMonthWithDays from './CalendarViewControlMonthWithDays';
import CalendarViewControlWeekWithDays from './CalendarViewControlWeekWithDays';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import {useForceUpdate} from '../../../../shared/hooks/useForceUpdate';

type CalendarViewControlListProps = {
  rate: Animated.SharedValue<number>;
};

const LIST_INDENT = 1;

const CalendarViewControlList = ({rate}: CalendarViewControlListProps) => {
  const {mode, controlIndex, monthIndex, weekIndex} = useCalendarContext();
  const prevMode = usePreviousValue(mode.value);
  const forceUpdate = useForceUpdate();

  const monthParams = useMemo<CalendarMonthParams[]>(() => {
    const indent = mode.value === 'month' || mode !== prevMode ? LIST_INDENT : 0;
    return ArrayUtils.range(-indent, indent).map((i) => ({
      monthIndex: monthIndex.value + i,
      controlIndex: controlIndex.value + i,
      freeze: i !== 0,
    }));
  }, [controlIndex.value, monthIndex.value, mode.value]);

  const weekParams = useMemo<CalendarWeekParams[]>(() => {
    const indent = mode.value === 'week' || mode !== prevMode ? LIST_INDENT : 0;
    return ArrayUtils.range(-indent, indent).map((i) => ({
      weekIndex: weekIndex.value + i,
      controlIndex: controlIndex.value + i,
      freeze: i !== 0,
    }));
  }, [controlIndex.value, weekIndex.value, mode.value]);

  useDerivedValue(() => {
    runOnJS(forceUpdate)(mode.value, controlIndex.value, monthIndex.value, weekIndex.value);
  });

  return (
    <FBox position="relative" grow>
      {monthParams.map(({monthIndex, controlIndex, freeze}) => (
        <CalendarViewControlMonthWithDays
          monthIndex={monthIndex}
          controlIndex={controlIndex}
          weekIndex={weekIndex.value}
          freeze={freeze}
          rate={rate}
          key={`month_${monthIndex}`}
        />
      ))}
      {weekParams.map(({weekIndex, controlIndex, freeze}) => (
        <CalendarViewControlWeekWithDays
          weekIndex={weekIndex}
          controlIndex={controlIndex}
          monthIndex={monthIndex.value}
          freeze={freeze}
          rate={rate}
          key={`week_${weekIndex}`}
        />
      ))}
    </FBox>
  );
};

export default memo(CalendarViewControlList);
