import React, {memo, useMemo} from 'react';
import {CalendarDate} from '../../../../models/Calendar';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import FBox from '../../../../components/boxes/FBox';
import {cloneDeep} from 'lodash';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import CalendarViewWeek from '../calendarViewWeek/CalendarViewWeek';

type CalendarViewControlWeekProps = {
  weekIndex: number;
  monthIndex: number;
  freeze: boolean;
};

const CalendarViewControlWeek = ({weekIndex, monthIndex, freeze}: CalendarViewControlWeekProps) => {
  const reminders = useAppSelector(CalendarSelectors.reminders);

  const weekDates = useMemo<CalendarDate[]>(() => {
    return CalendarUtils.generateWeekDates(weekIndex);
  }, []);

  const dates = useMemo<CalendarDate[]>(() => {
    const enrichedWeekDates = weekDates.map((date) => {
      const dateMonthIndex = CalendarUtils.getMonthIndexByItem(date);
      const monthKey = CalendarUtils.buildMonthKeyByItem(date);
      date.isActiveMonth = monthIndex === dateMonthIndex;
      date.reminders = reminders.get(monthKey)?.filter((r) => new Date(r.date).getDate() === date.date) || [];
      return date;
    });
    return cloneDeep(enrichedWeekDates);
  }, [monthIndex, reminders]);

  return (
    <FBox py={1}>
      <CalendarViewWeek dates={dates} freeze={freeze} />
    </FBox>
  );
};

export default memo(CalendarViewControlWeek);
