import React, {memo, useMemo} from 'react';
import {CalendarWeek} from '../../../../models/Calendar';
import Separator from '../../../../components/layouts/Separator';
import CalendarViewWeekDays from '../calendarViewWeek/CalendarViewWeekDays';
import CalendarViewWeek from '../calendarViewWeek/CalendarViewWeek';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';

type CalendarViewWeekListItemProps = {
  weekIndex: number;
};

const CalendarViewWeekListItem = ({weekIndex}: CalendarViewWeekListItemProps) => {
  const week = useMemo<CalendarWeek>(() => {
    // TODO
    return CalendarUtils.generateMonthDates(weekIndex).slice(0, 7);
  }, []);

  return (
    <>
      <Separator />
      <CalendarViewWeekDays />
      <Separator mb={1} />
      <CalendarViewWeek week={week} />
      <Separator mt={1} />
    </>
  );
};

export default memo(CalendarViewWeekListItem);
