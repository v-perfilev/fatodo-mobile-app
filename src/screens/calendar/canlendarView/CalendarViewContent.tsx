import React, {Dispatch, memo, SetStateAction, useMemo} from 'react';
import {Divider} from 'native-base';
import FVStack from '../../../components/boxes/FVStack';
import CalendarViewMonthName from './CalendarViewMonthName';
import CalendarViewWeekDays from './CalendarViewWeekDays';
import CalendarViewMonth from './CalendarViewMonth';
import CalendarViewReminders from './calendarViewReminders/CalendarViewReminders';
import {CalendarDate, CalendarItem, CalendarMonth} from '../../../models/Calendar';
import {CalendarReminder} from '../../../models/Reminder';

type CalendarViewContentProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
  activeDate: CalendarDate;
  setActiveDate: Dispatch<SetStateAction<CalendarDate>>;
  reminderMap: Map<number, CalendarReminder[]>;
  width: number;
};

const CalendarViewContent = ({
  month,
  selectMonth,
  activeDate,
  setActiveDate,
  reminderMap,
  width,
}: CalendarViewContentProps) => {
  const activeDateReminders = useMemo<CalendarReminder[]>(
    () => (activeDate ? reminderMap.get(new Date(activeDate.date).getDate()) : undefined),
    [activeDate, reminderMap],
  );

  return (
    <FVStack flex="1" flexGrow="1" space="2" py="2">
      <CalendarViewMonthName month={month} selectMonth={selectMonth} />
      <Divider bg="gray.200" />
      <FVStack space="2">
        <CalendarViewWeekDays />
        <CalendarViewMonth
          month={month}
          activeDate={activeDate}
          selectDate={setActiveDate}
          reminderMap={reminderMap}
          width={width}
        />
      </FVStack>
      <Divider bg="gray.200" />
      <CalendarViewReminders reminders={activeDateReminders} />
    </FVStack>
  );
};

export default memo(CalendarViewContent);
