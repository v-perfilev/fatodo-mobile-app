import React, {Dispatch, memo, SetStateAction} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import CalendarViewMonthName from './CalendarViewMonthName';
import CalendarViewWeekDays from './CalendarViewWeekDays';
import CalendarViewMonth from './CalendarViewMonth';
import {CalendarDate, CalendarItem, CalendarMonth} from '../../../models/Calendar';
import Separator from '../../../components/layouts/Separator';
import CalendarViewReminders from './calendarViewReminders/CalendarViewReminders';

type CalendarViewContentProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
  activeDate: CalendarDate;
  setActiveDate: Dispatch<SetStateAction<CalendarDate>>;
  width: number;
};

const CalendarViewContent = ({month, selectMonth, activeDate, setActiveDate, width}: CalendarViewContentProps) => {
  return (
    <FVStack flex="1" flexGrow="1" space="2" py="2">
      <CalendarViewMonthName month={month} selectMonth={selectMonth} />
      <Separator />
      <FVStack space="2">
        <CalendarViewWeekDays />
        <CalendarViewMonth month={month} activeDate={activeDate} selectDate={setActiveDate} width={width} />
      </FVStack>
      <Separator />
      <CalendarViewReminders month={month} date={activeDate} />
    </FVStack>
  );
};

export default memo(CalendarViewContent);
