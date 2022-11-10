import React, {memo, useMemo} from 'react';
import {CalendarWeek} from '../../../../models/Calendar';
import Separator from '../../../../components/layouts/Separator';
import CalendarViewWeekDays from '../calendarViewWeek/CalendarViewWeekDays';
import CalendarViewWeek from '../calendarViewWeek/CalendarViewWeek';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import Animated from 'react-native-reanimated';
import FBox from '../../../../components/boxes/FBox';

type CalendarViewMonthListItemProps = {
  monthIndex: number;
  rate: Animated.SharedValue<number>;
};

const CalendarViewMonthListItem = ({monthIndex, rate}: CalendarViewMonthListItemProps) => {
  const weeks = useMemo<CalendarWeek[]>(() => {
    const dates = CalendarUtils.generateMonthDates(monthIndex);
    const weeks: CalendarWeek[] = [];
    while (dates.length) {
      weeks.push(dates.splice(0, 7));
    }
    return weeks;
  }, []);

  return (
    <>
      <Separator />
      <CalendarViewWeekDays />
      <Separator mb={1} />
      <FBox grow>
        {weeks.map((week, index) => (
          <CalendarViewWeek rate={rate} week={week} key={index} />
        ))}
      </FBox>
      <Separator mt={1} />
    </>
  );
};

export default memo(CalendarViewMonthListItem);
