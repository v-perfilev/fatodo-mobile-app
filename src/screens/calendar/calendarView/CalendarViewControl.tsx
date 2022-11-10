import React, {useMemo, useState} from 'react';
import Animated, {runOnJS, useDerivedValue} from 'react-native-reanimated';
import {CalendarMode} from '../../../models/Calendar';
import CalendarViewTitle from './CalendarViewTitle';
import CalendarViewMonthList from './calendarViewMonthList/CalendarViewMonthList';

type CalendarViewControlProps = {
  rate: Animated.SharedValue<number>;
};

const CalendarViewControl = ({rate}: CalendarViewControlProps) => {
  const [mode, setMode] = useState<CalendarMode>('month');

  useDerivedValue(() => {
    runOnJS(setMode)(rate.value === 0 ? 'week' : 'month');
  });

  const monthList = useMemo(() => <CalendarViewMonthList rate={rate} />, []);

  const weekList = useMemo(() => <CalendarViewMonthList rate={rate} />, []);

  const control = useMemo(() => {
    return mode === 'month' ? monthList : weekList;
  }, [mode, monthList, weekList]);

  return (
    <>
      <CalendarViewTitle />
      {control}
    </>
  );
};

export default CalendarViewControl;
