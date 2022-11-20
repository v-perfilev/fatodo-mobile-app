import React, {memo, useMemo} from 'react';
import {runOnJS, useDerivedValue} from 'react-native-reanimated';
import {CalendarMonthParams, CalendarWeekParams} from '../../../../models/Calendar';
import {ArrayUtils} from '../../../../shared/utils/ArrayUtils';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import {useForceUpdate} from '../../../../shared/hooks/useForceUpdate';
import FBox from '../../../../components/boxes/FBox';
import CalendarViewControlMonth from './CalendarViewControlMonth';
import CalendarViewControlWeek from './CalendarViewControlWeek';

const LIST_INDENT = 1;

const CalendarViewControlList = () => {
  const {controlIndex, monthIndex, weekIndex} = useCalendarContext();
  const forceUpdate = useForceUpdate();

  const monthParams = useMemo<CalendarMonthParams[]>(() => {
    return ArrayUtils.range(-LIST_INDENT, LIST_INDENT).map((i) => ({
      monthIndex: monthIndex.value + i,
      controlIndex: controlIndex.value + i,
    }));
  }, [monthIndex.value, controlIndex.value]);

  const weekParams = useMemo<CalendarWeekParams[]>(() => {
    return ArrayUtils.range(-LIST_INDENT, LIST_INDENT).map((i) => ({
      weekIndex: weekIndex.value + i,
      controlIndex: controlIndex.value + i,
    }));
  }, [weekIndex.value, controlIndex.value]);

  useDerivedValue(() => {
    runOnJS(forceUpdate)(monthIndex.value, weekIndex.value);
  });

  return (
    <FBox position="relative">
      {monthParams.map(({monthIndex, controlIndex}) => (
        <CalendarViewControlMonth monthIndex={monthIndex} controlIndex={controlIndex} key={`month_${monthIndex}`} />
      ))}
      {weekParams.map(({weekIndex, controlIndex}) => (
        <CalendarViewControlWeek weekIndex={weekIndex} controlIndex={controlIndex} key={`week_${weekIndex}`} />
      ))}
    </FBox>
  );
};

export default memo(CalendarViewControlList);
