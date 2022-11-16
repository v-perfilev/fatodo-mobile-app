import React, {memo, useMemo} from 'react';
import {CalendarEnrichedDate} from '../../../../models/Calendar';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import FBox from '../../../../components/boxes/FBox';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import CalendarViewWeek from '../calendarViewWeek/CalendarViewWeek';
import {cloneDeep} from 'lodash';

type CalendarViewControlWeekProps = {
  weekIndex: number;
};

const CalendarViewControlWeek = ({weekIndex}: CalendarViewControlWeekProps) => {
  const reminders = useAppSelector(CalendarSelectors.reminders);

  const weekDates = useMemo<CalendarEnrichedDate[]>(() => {
    return CalendarUtils.generateWeekDates(weekIndex);
  }, []);

  const dates = useMemo<CalendarEnrichedDate[]>(() => {
    const datesWithReminders = weekDates.map((date) => {
      const monthKey = CalendarUtils.buildMonthKeyByItem(date);
      date.reminders = reminders.get(monthKey)?.filter((r) => new Date(r.date).getDate() === date.date) || [];
      return date;
    });
    return cloneDeep(datesWithReminders);
  }, [reminders]);

  return (
    <FBox py={1}>
      <CalendarViewWeek dates={dates} />
    </FBox>
  );
};

export default memo(CalendarViewControlWeek);
