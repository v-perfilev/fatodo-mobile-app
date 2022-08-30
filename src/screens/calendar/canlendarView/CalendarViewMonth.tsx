import React, {Dispatch, SetStateAction, useCallback, useMemo} from 'react';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarDate, CalendarMonth} from '../../../models/Calendar';
import FHStack from '../../../components/boxes/FHStack';
import CalendarViewDate from './CalendarViewDate';
import {Box} from 'native-base';
import {CalendarReminder} from '../../../models/Reminder';

type CalendarViewMonthProps = {
  month: CalendarMonth;
  activeDate: CalendarDate;
  selectDate: Dispatch<SetStateAction<CalendarDate>>;
  reminderMap: Map<number, CalendarReminder[]>;
  width: number;
};

const CalendarViewMonth = ({month, activeDate, selectDate, reminderMap, width}: CalendarViewMonthProps) => {
  const pageDates = useMemo<CalendarDate[]>(() => CalendarUtils.getOnePageDates(month.year, month.month), [month]);

  const isActiveDate = useCallback((date: CalendarDate) => date.date === activeDate?.date, [activeDate]);
  const getDateReminders = useCallback(
    (date: CalendarDate) => (date.isCurrentMonth ? reminderMap.get(date.date) : []),
    [reminderMap],
  );

  const dateWidth = (width - 6) / 7;

  return (
    <FHStack mx="3px" flexWrap="wrap">
      {pageDates.map((date, index) => (
        <Box w={dateWidth} key={index}>
          <CalendarViewDate
            date={date}
            selectDate={selectDate}
            isActiveDate={isActiveDate(date)}
            reminders={getDateReminders(date)}
          />
        </Box>
      ))}
    </FHStack>
  );
};

export default CalendarViewMonth;
