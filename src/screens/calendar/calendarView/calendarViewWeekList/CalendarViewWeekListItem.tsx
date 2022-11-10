import React, {memo, useMemo} from 'react';
import {CalendarWeek} from '../../../../models/Calendar';
import Separator from '../../../../components/layouts/Separator';
import CalendarViewWeekDays from '../calendarViewWeek/CalendarViewWeekDays';
import CalendarViewWeek from '../calendarViewWeek/CalendarViewWeek';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import FBox from '../../../../components/boxes/FBox';

type CalendarViewWeekListItemProps = {
  weekIndex: number;
};

const CalendarViewWeekListItem = ({weekIndex}: CalendarViewWeekListItemProps) => {
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);

  const week = useMemo<CalendarWeek>(() => {
    const weekDates = CalendarUtils.generateWeekDates(weekIndex);
    weekDates.forEach((d) => {
      d.isCurrentMonth = CalendarUtils.getMonthIndexByDate(d) === monthIndex;
    });
    return weekDates;
  }, [monthIndex]);

  return (
    <>
      <CalendarViewWeekDays />
      <Separator />
      <FBox my={1}>
        <CalendarViewWeek week={week} />
      </FBox>
    </>
  );
};

export default memo(CalendarViewWeekListItem);
