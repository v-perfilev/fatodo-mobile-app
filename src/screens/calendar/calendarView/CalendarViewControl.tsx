import React, {Dispatch, SetStateAction, useMemo, useState} from 'react';
import Animated, {runOnJS, useDerivedValue} from 'react-native-reanimated';
import {CalendarDate, CalendarMode, CalendarWeek} from '../../../models/Calendar';
import CalendarViewWeekDays from './CalendarViewWeekDays';
import Separator from '../../../components/layouts/Separator';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import FVStack from '../../../components/boxes/FVStack';
import CalendarViewWeek from './CalendarViewWeek';
import CalendarViewMonthName from './CalendarViewMonthName';

type CalendarViewControlProps = {
  rate: Animated.SharedValue<number>;
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
  monthNameHeight: number;
  weekDaysHeight: number;
  dateHeight: number;
};

const CalendarViewControl = ({
  rate,
  date,
  setDate,
  monthNameHeight,
  weekDaysHeight,
  dateHeight,
}: CalendarViewControlProps) => {
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

  return (
    <FVStack>
      <CalendarViewMonthName height={monthNameHeight} {...{date, setDate}} />
      <Separator />
      <CalendarViewWeekDays height={weekDaysHeight} />
      <Separator mb={1} />
      {weeks.map((week, index) => (
        <CalendarViewWeek {...{rate, week, date, setDate, dateHeight}} key={index} />
      ))}
      <Separator mt={1} />
    </FVStack>
  );
};

export default CalendarViewControl;
