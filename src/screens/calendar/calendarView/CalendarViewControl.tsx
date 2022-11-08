import React, {Dispatch, SetStateAction, useMemo, useState} from 'react';
import Animated, {runOnJS, useAnimatedStyle, useDerivedValue} from 'react-native-reanimated';
import {CalendarDate, CalendarMode, CalendarWeek} from '../../../models/Calendar';
import CalendarViewWeekDays from './CalendarViewWeekDays';
import Separator from '../../../components/layouts/Separator';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import CalendarViewWeek from './CalendarViewWeek';
import CalendarViewMonthName from './CalendarViewMonthName';

type CalendarViewControlProps = {
  height: Animated.SharedValue<number>;
  rate: Animated.SharedValue<number>;
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
};

const CalendarViewControl = ({height, rate, date, setDate}: CalendarViewControlProps) => {
  const [mode, setMode] = useState<CalendarMode>('month');

  const weeks = useMemo<CalendarWeek[]>(() => {
    const dates = CalendarUtils.getOnePageDates(date.year, date.month);
    const weeks: CalendarWeek[] = [];
    while (dates.length) {
      weeks.push(dates.splice(0, 7));
    }
    return weeks;
  }, [date.year, date.month]);

  useDerivedValue(() => {
    runOnJS(setMode)(rate.value === 0 ? 'week' : 'month');
  });

  const style = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden',
  }));

  return (
    <Animated.View style={style}>
      <CalendarViewMonthName date={date} setDate={setDate} />
      <Separator />
      <CalendarViewWeekDays />
      <Separator mb={1} />
      {weeks.map((week, index) => (
        <CalendarViewWeek rate={rate} week={week} date={date} setDate={setDate} key={index} />
      ))}
      <Separator mt={1} />
    </Animated.View>
  );
};

export default CalendarViewControl;
